var Animal = require('../../../models/animals.js');
var async = require('async');


/**
 * ============================================================================
 * Edit Photo Info
 * 
 */
module.exports = function(req, res, next) {

  var info = req.body;

  async.waterfall([
    function(callback) {
      Animal.findOne({ _id: req.params.idAnimal }, callback)
    },
    function(animal, callback) {
      for (var i = 0; i < animal.photos.length; ++i) {
        if (animal.photos[i]._id == req.params.idPhoto) {
          animal.photos[i].info = info;
          break;
        }
      }
      callback(null, animal);
    },
    function(animal, callback) {
      animal.save(function() {
        callback(null);
      });
    }
  ], function(err, results) {
    if (err) {
      res.send({ success: false });
    } else {
      res.send({ success: true });
    }
  });
};