const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
// Serve up the static html files
app.use(express.static(path.join(__dirname, '../client/dist')));
// Parser middleware
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('listening on port 3000');
});
