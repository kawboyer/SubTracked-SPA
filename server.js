const express = require('express');
const path = require('path');
var github = require('./routes/github');

let app = express();

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/subtracked', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


app.use(express.static(__dirname + "/dist"));
app.use('/Github', github);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/subtracked";

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port)
});