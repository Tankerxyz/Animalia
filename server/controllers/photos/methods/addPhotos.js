var Animal = require('../../../models/animals.js');
var Photo = require('../../../models/photo.js');
var gm = require('gm');
var fs = require('fs');
var config = require('../../../config');
var async = require('async');
var uploads_path = config.get('server:uploads:url');

var imageSize = {
  width: {
    small: 310
  },
  height: {
    small: 180
  }
};


/**
 * ============================================================================
 * Upload Photos
 * 
 */
module.exports = function(req, res, next) {
  
  var id = req.params.id;
  var buf = new Buffer(req.body.file.base64, 'base64');
  var ext = req.body.file.filetype.replace('image/', '.');
  var imgPath = uploads_path + id + '/';  

  var globalData = null;
  async.waterfall([
    function(callback) {

      /**
       * Check exist dir Animal
       */

      var indexPhoto = req.body.index;
      async.series([
        function(callback) {
          fs.exists(uploads_path + id, function(data) {
            if (!data) {
              fs.mkdir(uploads_path + id, function() {
                  callback(null);
              });
            } else {
              callback(null);
            }
          });
        }
      ], function(err, results) {
        callback(null, indexPhoto);
      });
    },
    function(index, callback) {

      async.waterfall([
        function(callback) {
          Animal.findOne({ _id: id }, function(err, data) {
            callback(err, data, index);
          });
        },
        function(animal, index, callback) {

          var photo = new Photo({
            extension: ext,
            name: animal.title,
            author: req.user.username,
            info: req.body.info
          });

          photo.url = imgPath + photo._id + photo.extension;

          animal.photos.push(photo);
          animal.save(function(err, data, affected) {
            callback(err, data, affected, index);
          });
        },

        function(animal, affected, index, callback) {

          /**
           * Create photos
           */

          var photo = animal.photos[animal.photos.length - 1];
          var url = photo.url;
          var urlSmall = url.replace('.', '.small.');

          async.series([
            function(callback) {
              gm(buf, 'image.' + ext)
                .write(url, callback);
            },
            function(callback) {
              gm(buf, 'image.' + ext)
                .resize(imageSize.width.small, imageSize.height.small)
                .write(urlSmall, callback);
            }
          ], function(err) {
            if (err) {
              fs.unlink(url, function() { 
                fs.unlink(urlSmall, function() {
                  callback(null, index);
                 });
              });              
            } else {
              callback(null, index)
            }
          });
        }
      ], function(err, index) {
        if (err) {
          console.log(err);
          
          if (globalData) {
            data.photos.pop();
            data.save();
          }
          res.status(400).send({ success: false });
        } else {
          res.send({ success: true, message: index });
        }

        callback(null);
      });
    }
  ]);
};