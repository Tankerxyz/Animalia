var Animal = require('../../../models/animals.js');
var async = require('async');
var fs = require('fs');


/**
 * ============================================================================
 * Delete Many Photos
 * 
 */
module.exports = function(req, res, next) {

  var delPhotos = req.body;

  async.waterfall([
    function(cb) {
      Animal.findOne({ _id: req.params.idAnimal }, cb);
    },
    function(animal, cb) {
      for (var i = 0; i < delPhotos.length; ++i) {
        for (var j = 0; j < animal.photos.length; ++j) {
          if (delPhotos[i].id == animal.photos[j]._id) {
            animal.photos.splice(j, 1);
            break;
          }
        }
      }

      animal.save(function() {
        cb(null);
      });
    },
    function(cb) {
      async.eachSeries(delPhotos, function(item, cb) {

        var url = item.url;
        var urlSmall = url.replace('.', '.small.');

        async.series([
          function(cb) {
            fs.unlink(url, function() {
              cb(null);
            });
          },
          function(cb) {
            fs.unlink(url, function() {
              cb(null);
            });
          }
        ], function(err, results) {
          cb(null);
        });
      }, function() {
        cb(null);
      });
    }
  ], function(err) {
    if (err) {
      res.status(400);
    }

    res.send({ success: true, message: delPhotos });
  });
};