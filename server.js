const express = require('express');
const path = require('path');
var github = require('./routes/github');

let app = express();

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mean-angular5', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


app.use(express.static(__dirname + "/dist"));
app.use('/Github', github);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port)
});