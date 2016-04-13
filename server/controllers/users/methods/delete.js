var User = require('../../../models/user');


module.exports = function(req, res, next) {
  
  User.remove({ _id: req.params.id }, function(err) {
    if (err) {
      res.status(404).end();
    } else {
      res.send({ success: true });
    }
  });
};