var Animal = require('../../../models/animals.js');


module.exports = function(req, res, next) {
  
  var animal = new Animal(req.body);

  animal.save(function(err, data) {
    if (err) {
      res.status(400).send({ success: false });
    }

    if (data) {
      res.send({ success: true });
    }
  });

};