require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

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

// GET sent from search function
app.get('/search/:artist', (req, res) => {
  const { artist } = req.params;
  // 1: get aritist ID from MusixMatch, using the query obj
  axios.get(`https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${artist}&apikey=${process.env.MM_API_KEY}`)
    .then((response) => {
      const artistId = response.data.message.body.artist_list[0].artist.artist_id;
      return artistId;
    })
    .then((artistId) => {
      // 2: get albums of this artist, sorted by most recent release
      axios.get(`https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${artistId}&s_release_date=desc&g_album_name=1&apikey=${process.env.MM_API_KEY}`);
    })
    .then((albumRes) => {
      const albumArr = albumRes.data.message.body.album_list;
      // This array of albums has a lot of info in it, but all I really want are the album ids.
      const albumIdArr = albumArr.map(element => element.album.album_id);
      return albumIdArr;
    })
    .then((albumIdArr) => {
      // make an array of promises to complete for each album (each promise will return a track list)
      const trackPromises = albumIdArr.map(id => (
        axios.get(`https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${id}&apikey=${process.env.MM_API_KEY}`)
      ));
      return Promise.all(trackPromises);
    })
    .then((resArr) => {
      // resArr is an array of Album objects, each with a track list array
      // I really just want an array of all the trackIds
      const trackLists = resArr.map(object => object.data.message.body.track_list);
      const flatTrackLists = flatten(trackLists);
      const trackIds = flatTrackLists.map(element => element.track.track_id);
      return trackIds;
    })
    .then((trackIds) => {
      // Finally have an array of track ids
      // Need to get lyrics for each track
    })
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
