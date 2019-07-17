require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
// Serve up the static html files
app.use(express.static(path.join(__dirname, '../client/dist')));
// Parser middleware
app.use(bodyParser.json());

// GET sent from search function
app.get('/search/:artist', (req, res) => {

});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
