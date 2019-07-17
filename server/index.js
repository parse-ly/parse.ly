require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
// Serve up the static html files
app.use(express.static(path.join(__dirname, '../client/dist')));
// Parser middleware
app.use(bodyParser.json());

// GET sent from search function
app.get('/search/:artist', (req, res) => {
  const { artist } = req.params;
  const trackIds = [];
  // 1: get aritist ID from MusixMatch, using the query obj
  axios.get(`https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${artist}&apikey=${process.env.MM_API_KEY}`)
    .then((response) => {
      const artistId = response.data.message.body.artist_list[0].artist.artist_id;
      return artistId;
    })
    .then((artistId) => {
      // 2: get albums of this artist, sorted by most recent release
      return axios.get(`https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${artistId}&s_release_date=desc&g_album_name=1&apikey=${process.env.MM_API_KEY}`)
    })
    .then((albumRes) => {
      const albumArr = albumRes.data.message.body.album_list;
      // This array of albums has a lot of info in it, but all I really want are the album ids.
      const albumIdArr = albumArr.map(element => element.album.album_id);
      return albumIdArr;
    })
    .then((albumIdArr) => {
      albumIdArr.forEach((id) => {
        axios.get(`https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${id}&apikey=${process.env.MM_API_KEY}`)
          .then((trackRes) => {
            const trackList = trackRes.data.message.body.track_list;
            trackList.forEach(track => trackIds.push(track.track.track_id));
          })
          .then(() => {
            console.log(trackIds);
          })
      });
    })
    .then(() => {
      console.log(trackIds);
    })
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
