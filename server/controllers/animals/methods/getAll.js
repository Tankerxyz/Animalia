var Animal = require('../../../models/animals.js');

module.exports = function(req, res, next) {
  
  Animal.find({}, { title: 1 }, function(err, data) {
    if (err) {
      res.status(500).end();  
    }

    if (data.length) {
      res.send({ success: true, data: data });
    } else {
      res.send({ success: false });
    }
  });

}