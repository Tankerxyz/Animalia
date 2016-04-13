var Animal = require('../../../models/animals.js');


/**
 * ============================================================================
 * Get Full Photo Info
 * 
 */
module.exports = function(req, res, next) {
  
  Animal.findOne({ _id: req.params.id }, function(err, data) {
    if (err) {
      res.status(400).send({ success: false });
    }

    var photo = {};

    for (var i = 0; i < data.photos.length; ++i) {
      if (data.photos[i]._id == req.params.idPhoto) {
        photo = data.photos[i];
        break;
      }
    }

    if (!photo) {
      res.status(400).send({ success: false });
    }

    res.send({ success: true, message: photo });
  });

};

