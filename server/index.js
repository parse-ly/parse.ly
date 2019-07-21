require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { Song, User } = require('../database/database');

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    ((accessToken, refreshToken, profile, done) => {
      const userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accessToken,
      };
      done(null, userData);
    }),
  ),
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

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
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

/* GET Google Authentication API. */
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    const { token, name } = req.user;
    const uriName = encodeURIComponent(name);
    res.redirect(`http://127.0.0.1.xip.io:${process.env.PORT || 3000}?token=${token}&name=${uriName}`);
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/music', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/video/:query', (req, res) => {
  const { query } = req.params;
  // send this query to Youtube API
  // get first result, send it in res
  const uriQuery = encodeURIComponent(query);
  axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${uriQuery}&key=${process.env.YT_API_KEY}`)
    .then((response) => {
      const { videoId } = response.data.items[0].id;
      const link = `https://www.youtube.com/embed/${videoId}`;
      res.status(200);
      res.json(link);
    })
    .catch(err => console.error(err));
});

// UNCOMMENT WHEN TESTING SERVER
// app.get('/search/:artist', (req, res) => {
//   res.status(200);
//   res.json([
//     {
//       songname: 'Airbag (Remastered)',
//       artist: 'radiohead',
//       trackId: 131252745,
//       score: 0.543400228023529,
//       polarity: 'positive',
//     },
//     {
//       songname: 'Paranoid Android (Remastered)',
//       artist: 'radiohead',
//       trackId: 131252746,
//       score: 0.6707372069358826,
//       polarity: 'negative',
//     },
//     {
//       songname: 'Subterranean Homesick Alien (Remastered)',
//       artist: 'radiohead',
//       trackId: 131252747,
//       score: 0.8493298292160034,
//       polarity: 'positive',
//     },
//     {
//       songname: 'Exit Music (For a Film) (Remastered)',
//       artist: 'radiohead',
//       trackId: 131252748,
//       score: 0.6650996208190918,
//       polarity: 'negative',
//     },
//     {
//       songname: 'Let Down (Remastered)',
//       artist: 'radiohead',
//       trackId: 131252749,
//       score: 0.9453450441360474,
//       polarity: 'negative',
//     },
//     {
//       songname: 'Karma Police (Remastered)',
//       artist: 'radiohead',
//       trackId: 131252750,
//       score: 0.49653804302215576,
//       polarity: 'positive',
//     },
//     {
//       songname: 'Fitter Happier (Remastered)',
//       artist: 'radiohead',
//       trackId: 131252751,
//       score: 0.996536374092102,
//       polarity: 'positive',
//     },
//     {
//       songname: 'Electioneering (Remastered)',
//       artist: 'radiohead',
//       trackId: 131252752,
//       score: 0.44361528754234314,
//       polarity: 'positive',
//     },
//     {
//       songname: 'Climbing Up the Walls (Remastered)',
//       artist: 'radiohead',
//       trackId: 131252753,
//       score: 0.528287494889078,
//       polarity: 'neutral',
//     },
//     {
//       songname: 'No Surprises (Remastered)',
//       artist: 'radiohead',
//       trackId: 131252754,
//       score: 0.5381248593330383,
//       polarity: 'negative',
//     },
//     {
//       songname: 'I Promise',
//       artist: 'radiohead',
//       trackId: 130499991,
//       score: 0.6147956252098083,
//       polarity: 'negative',
//     },
//     {
//       songname: 'These Are My Twisted Words',
//       artist: 'radiohead',
//       trackId: 8767940,
//       score: 0.4318546950817108,
//       polarity: 'negative',
//     },
//     {
//       songname: 'll Wind',
//       artist: 'radiohead',
//       trackId: 115016516,
//       score: 0.5782575011253357,
//       polarity: 'positive',
//     },
//     {
//       songname: 'Burn The Witch',
//       artist: 'radiohead',
//       trackId: 111289198,
//       score: 0.7488194108009338,
//       polarity: 'negative',
//     },
//     {
//       songname: 'Daydreaming',
//       artist: 'radiohead',
//       trackId: 111289200,
//       score: 0.8257342576980591,
//       polarity: 'negative',
//     },
//     {
//       songname: 'Decks Dark',
//       artist: 'radiohead',
//       trackId: 111289202,
//       score: 0.535029947757721,
//       polarity: 'positive',
//     },
//     {
//       songname: 'Desert Island Disk',
//       artist: 'radiohead',
//       trackId: 111289204,
//       score: 0.520104706287384,
//       polarity: 'negative',
//     },
//     {
//       songname: 'Ful Stop',
//       artist: 'radiohead',
//       trackId: 111289205,
//       score: 0.9969593286514282,
//       polarity: 'negative',
//     },
//     {
//       songname: 'Glass Eyes',
//       artist: 'radiohead',
//       trackId: 111289206,
//       score: 0.730898916721344,
//       polarity: 'positive',
//     },
//     {
//       songname: 'Identikit',
//       artist: 'radiohead',
//       trackId: 111289207,
//       score: 0.9434064626693726,
//       polarity: 'positive',
//     },
//     {
//       songname: 'The Numbers',
//       artist: 'radiohead',
//       trackId: 111289208,
//       score: 0.9768570065498352,
//       polarity: 'positive',
//     },
//     {
//       songname: 'Present Tense',
//       artist: 'radiohead',
//       trackId: 111289209,
//       score: 0.5278725624084473,
//       polarity: 'neutral',
//     },
//     {
//       songname: 'Tinker Tailor Soldier Sailor Rich Man Poor Man Beggar Man Thief',
//       artist: 'radiohead',
//       trackId: 111289210,
//       score: 0.8320677876472473,
//       polarity: 'positive',
//     },
//     {
//       songname: 'Daydreaming',
//       artist: 'radiohead',
//       trackId: 110995165,
//       score: 0.8257342576980591,
//       polarity: 'negative',
//     },
//     {
//       songname: 'Burn the Witch',
//       artist: 'radiohead',
//       trackId: 110707686,
//       score: 0.7488194108009338,
//       polarity: 'negative',
//     },
//     {
//       songname: 'Spectre',
//       artist: 'radiohead',
//       trackId: 87802217,
//       score: 0.6934279203414917,
//       polarity: 'negative',
//     },
//   ]);
// });

// COMMENT OUT ENTIRE APP.GET FUNCTION WHEN TESTING SEARCH FUNCTIONALITY
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
              res.status(200);
              res.json(songsData);
            });
        });
    })
    .catch(err => console.error(err));
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port ${process.env.PORT || 3000}`);
});
