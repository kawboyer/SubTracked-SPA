var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Github = require("../models/Github.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Github");
  Github.find({}, function (err, dbGithub) {
    if (err) throw err;
    res.json(dbGithub);
  });
});

module.exports = router;