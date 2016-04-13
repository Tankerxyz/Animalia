var Animal = require('../../../models/animals.js');


/**
 * ============================================================================
 * Get All Photo Indexes
 * 
 */
module.exports = function(req, res, next) {

  Animal.findOne({ url: req.params.url }, function(err, data) {
    if (err) {
      res.status(400).send({ success: false });
    }

    if (data) {
      var arr = [];
      data.photos.forEach(function(el) {
        arr.push({
          id: el._id,
          url: el.url
        });
      });
      
      if (!arr) {
        res.status(404).end();
      } else {
        res.send({ success: true, data: arr });
      }
      
    } else {
      res.status(404).end();
    }
  });
};