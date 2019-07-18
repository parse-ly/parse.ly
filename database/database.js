const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  songname: String,
  artistname: String,
  score: Number,
  youtubelink: String
});

const userSchema = new mongoose.Schema({
  username: String,
  userid: Number
});

const Song = mongoose.model('Song', songSchema);
const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost/parsley', {useNewUrlParser: true}).catch((err) => {
  console.log('Having trouble with Database => ', err.message);
});

module.exports = {
  Song,
  User,
};