var Animal = require('../../../models/animals.js');


module.exports = function(req, res, next) {
  
  var reg = new RegExp('^'+req.params.str+'.*', 'i');
  var limit = req.params.limit;
  
  Animal.paginate({ title: reg }, { select: 'url title', limit: limit }, function(err, result) {

      if (err) {
        res.status(500).end();
      }
      
      if (result.docs.length) {
        res.send({ success: true, message: result.docs })
      } else {
        res.status(404).end();
      }
  });
};