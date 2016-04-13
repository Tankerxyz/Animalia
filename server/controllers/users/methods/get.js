var User = require('../../../models/user');


module.exports = function(req, res, next) {
  
  User.findOne({ _id: req.params.id }, { username: 1, usertype: 1 }, function(err, user) {
    if (err) {
      res.status(500).end();
    }
    
    if (user) {
      res.send({ success: true, message: user });
    } else {
      res.status(404).end();
    }
  });
  
};