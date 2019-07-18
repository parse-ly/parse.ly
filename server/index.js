require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const { Song, User } = require('../database/database');

// helper function:
const flatten = (multiArray) => {
  multiArray.forEach((element) => {
    if (Array.isArray(element)) {
      multiArray = flatten(Array.prototype.concat.apply([], multiArray));
    }
  });
  return multiArray;
};

const app = express();
// Serve up the static html files
app.use(express.static(path.join(__dirname, '../client/dist')));
// Parser middleware
app.use(bodyParser.json());

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});
// GET sent from search function
app.get('/search/:artist', (req, res) => {
  const { artist } = req.params;
  // 1: get aritist ID from MusixMatch, using the query obj
  axios.get(`https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${artist}&apikey=${process.env.MM_API_KEY}`)
    .then((response) => {
      const artistId = response.data.message.body.artist_list[0].artist.artist_id;
      return artistId;
    })
    .then(artistId => axios.get(`https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${artistId}&s_release_date=desc&g_album_name=1&apikey=${process.env.MM_API_KEY}`))
    .then((albumRes) => {
      const albumArr = albumRes.data.message.body.album_list;
      // This array of albums has a lot of info in it, but all I really want are the album ids.
      const albumIdArr = albumArr.map(element => element.album.album_id);
      return albumIdArr;
    })
    .then((albumIdArr) => {
      // make an array of promises to complete for each album (each promise will return a track list)
      const trackPromises = albumIdArr.map(id => (
        axios.get(`https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${id}&f_has_lyrics=1&apikey=${process.env.MM_API_KEY}`)
      ));
      return Promise.all(trackPromises);
    })
    .then((resArr) => {
      // resArr is an array of Album objects, each with a track list array
      // I really just want an array of all the trackIds
      const trackLists = resArr.map(object => object.data.message.body.track_list);
      const flatTrackLists = flatten(trackLists);
      const songNames = flatTrackLists.map(trackObj => trackObj.track.track_name);
      const songsData = [];
      flatTrackLists.forEach((track) => {
        const songData = {
          songname: track.track.track_name,
          artist,
          trackId: track.track.track_id,
        };
        songsData.push(songData);
      });
      return songsData;
    })
    .then((songsData) => {
      // Finally have an array of track ids
      // Need to get lyrics for each track
      const lyricPromises = songsData.map(songData => (
        axios.get(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${songData.trackId}&apikey=${process.env.MM_API_KEY}`)
      ));
      const songsDataAndPromises = [songsData, lyricPromises];
      return songsDataAndPromises;
    })
    .then((songsDataAndPromises) => {
      // Then send each lyric snippet thru the AYLIEN API
      Promise.all(songsDataAndPromises[1])
        .then((lyricRes) => {
          const lyricsArr = lyricRes.map(lyricObj => lyricObj.data.message.body.lyrics.lyrics_body);
          // remove the water marks, make ready for URI placement
          const lyricsURI = lyricsArr.map((lyric) => {
            const noWaterMark = lyric.replace('******* This Lyrics is NOT for Commercial use *******', '');
            const result = encodeURIComponent(noWaterMark);
            return result;
          });
          const config = {
            headers: {
              'X-AYLIEN-TextAPI-Application-Key': process.env.AYLIEN_APP_KEY,
              'X-AYLIEN-TextAPI-Application-ID': process.env.AYLIEN_APP_ID,
            },
          };
          const data = {
            HTTP_CONTENT_LANGUAGE: 'text/javascript',
          };
          const lyricsPosts = lyricsURI.map(lyrics => axios.post(`https://api.aylien.com/api/v1/sentiment?text=${lyrics}&mode=document`, data, config));
          const songsDataAndLyricPosts = [songsDataAndPromises[0], lyricsPosts];
          return songsDataAndLyricPosts;
        })
        .then((songsDataAndLyricPosts) => {
          Promise.all(songsDataAndLyricPosts[1])
            .then((lyricScores) => {
              const songsData = songsDataAndLyricPosts[0];
              songsData.forEach((songData, i) => {
                songData.score = lyricScores[i].data.polarity_confidence;
                songData.polarity = lyricScores[i].data.polarity;
                Song.create({
                  songname: songData.songname,
                  artistname: songData.artist,
                  score: songData.score,
                  polarity: songData.polarity,
                });
              });
            });
        });
    })
    .catch(err => console.error(err));
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
