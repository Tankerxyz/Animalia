var Animal = require('../../../models/animals.js');
var async = require('async');


/**
 * ============================================================================
 * Get Photo Image File
 * 
 */
module.exports = function(req, res, next) {
  async.waterfall([
    function(cb) {
      Animal.findOne({ _id: req.params.idAnimal }, cb);
    },
    function(animal, cb) {
      var url = null;

      for (var i = 0; i < animal.photos.length; ++i) {
        if (animal.photos[i]._id == req.params.idPhoto) {
          var url = animal.photos[i].url;
          if (req.params.small != 0) url = url.replace('.', '.small.');         
          break;
        }
      }

      if (url) {
        cb(null, url);
      } else {
        cb(true);
      }
    }
  ], function(err, url) {
    if (err) {
      res.status(404).end();
    }

    res.sendFile(url);
  });
};