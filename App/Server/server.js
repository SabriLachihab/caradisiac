const elasticsearch = require('elasticsearch');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 9292;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes/cardisiac'));

app.listen(port, () => {
  console.log('Listening on ' + port);
});
