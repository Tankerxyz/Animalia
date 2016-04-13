var User = require('../../../models/user');


module.exports = function(req, res, next) {
  
  var regPass = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  
  if ( !(regPass.test(req.body.password)) ) {
    return res.status(400).end();
  }
  
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err, data) {
    if (err) {
      return res.status(400).end();
    }

    if (data) {
      res.send({ success: true });
    } else {
      res.status(500).end();
    }
  });
};