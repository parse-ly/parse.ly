const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');

mongoose.connect('mongodb://localhost/parsely', { useNewUrlParser: true }).catch((err) => {
  console.log('Having trouble with Database => ', err.message);
});

const songSchema = new mongoose.Schema({
  songname: String,
  artistname: String,
  score: Number,
  polarity: String,
  youtubelink: String,
});
songSchema.plugin(findOrCreate);

const userSchema = new mongoose.Schema({
  username: String,
  userid: Number,
});

const Song = mongoose.model('Song', songSchema);
const User = mongoose.model('User', userSchema);


module.exports = {
  Song,
  User,
};
