var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Github = require("../models/Github.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  Github.find(function (err, dbGithub) {
    if (err) return next(err);
    res.json(dbGithub);
  });
});

module.exports = router;