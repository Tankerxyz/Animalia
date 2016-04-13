var User = require('../../../models/user');


module.exports = function(req, res, next) {
  
  User.find({}, { username: 1, usertype: 1 }, function(err, data) {
    if (err) {
      res.status(500).end();
    }

    if (data.length) {
      res.send({ success: true, message: data });
    } else {
      res.status(404).end();
    }
  });
};