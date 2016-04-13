var Animal = require('../../../models/animals.js');


module.exports = function(req, res, next) {
  
  Animal.findOne({ _id: req.params.id }, { views: 0, photos: 0, __v: 0 }, function(err, data) {
    if (err) {
      res.status(500).end();  
    }

    if (data) {
      res.send({ success: true, data: data });
    } else {
      res.status(404).end();
    }
  });

};