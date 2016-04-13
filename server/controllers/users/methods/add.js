var User = require('../../../models/user');


module.exports = function(req, res, next) {
  
  var regPass = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  
  if ( !(regPass.test(req.body.password)) ) {
    return res.status(400).end();
  }
  
  var user = new User(req.body);
  
  user.save(function(err) {
    if (err) {
      res.status(500).end();
    } else {
      res.send({ success: true });
    }
  });
};
