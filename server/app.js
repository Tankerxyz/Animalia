var express = require('express');

var http = require('http');
var util = require('util');
var fs = require('fs');
var passport = require('passport');
var path = require('path');
var _ = require('lodash');
var mongoose = require('mongoose');
var config = require('./config');

var app = express();
var staticPath = path.join(__dirname, './../public')

app.use(express.static(staticPath));

app.get('/*', function(req, res, next) {
  var curPath = req.path.split('/');
  
  if(curPath[1] && curPath[1] == 'api') {
    next();
  } else {
    res.sendfile(staticPath + '/index.html');
  }
});

function walkRoutes(directory) {
  return fs.readdirSync(directory).forEach(function (file) {
      var newPath = directory + '/' + file;
      var stat = fs.statSync(newPath);
      if (stat.isFile()) {
        if (/(.*)\.(js$)/.test(file)) {
          return require(newPath)(app, passport)
        }
      } else {
        if (stat.isDirectory() && file !== "middlewares") {
          return walkRoutes(newPath)
        }
      }
    })
  }

walkRoutes(__dirname + "/routes");

app.listen(config.get('server:port'), function () {
  console.log('Server is listerning on port ' + config.get('server:port'));
});
