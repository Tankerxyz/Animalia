var Animal = require('../../../models/animals.js');


module.exports = function(req, res, next) {
  
  var animal = req.body;
  delete animal._id;
  
  Animal.update({ _id: req.params.id }, animal, function(err, affected) {
    
    if (err) {
      res.status(400).end();
    }

    res.send({ success: !!affected.n })
  })
};