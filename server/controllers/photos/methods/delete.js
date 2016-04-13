var async = require('async');
var Animal = require('../../../models/animals.js');
var fs = require('fs');


/**
 * ============================================================================
 * Remove Photo
 * 
 */
module.exports = function(req, res, next) {

  async.waterfall([
    function(cb) {
      Animal.findOne({ _id: req.params.idAnimal }, cb);
    },
    function(animal, cb) {
      var photoUrl = null;

      for (var i = 0; i < animal.photos.length; ++i) {
        if (animal.photos[i]._id == req.params.idPhoto) {
          photoUrl = animal.photos[i].url;
          animal.photos.splice(i, 1);
          break;
        }
      }
      
      animal.save(function() {
        if (photoUrl) {
          cb(null, photoUrl);
        } else {
          cb(true);
        }
      });
    },
    function(url, cb) {
      var urlSmall = url.replace('.', '.small.');

      async.series([
        function(cb) {
          fs.unlink(url, function() {
            cb(null);
          });
        },
        function(cb) {
          fs.unlink(urlSmall, function() {
            cb(null);
          });
        }
      ], function(err, results) {
        cb(null);
      })
    }
  ], function(err) {
    if (err) {
      res.status(400).end();
    }

    res.send({ success: true });
  })
};