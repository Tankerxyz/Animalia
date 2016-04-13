var Animal = require('../../../models/animals.js');


/**
 * ============================================================================
 * Get All Photo Indexes
 * 
 */
module.exports = function(req, res, next) {

  Animal.findOne({ _id: req.params.id }, function(err, data) {
    if (err) {
      res.status(400).end();
    }

    if (data) {
      if (data.photos) {
        res.send({ success: true, data: data.photos });
      } else {
        res.status(404).end();
      }      
      
    } else {
      res.status(404).end();
    }

  });
};