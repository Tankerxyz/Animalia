var User = require('../../../models/user');
var async = require('async');


module.exports = function(req, res, next) {
  
  var regPass = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  
  var newUsername = req.body.username;
  var newUsertype = req.body.usertype;
  var newPassword = req.body.password;
  
  async.waterfall([
    function(cb) {
      User.findOne({ _id: req.params.id }, cb)
    },
    function(user, cb) {
      
      user.username = newUsername;
      user.usertype = newUsertype;      
      if (newPassword) {
        if (regPass.test(newPassword)) {
          user.password = newPassword;
        } else {
          cb(true);
        }
      }
      
      cb(null, user);
    },
    function(user, cb) {
      user.save(function() {
        cb(null);
      });
    }
  ], function(err, results) {
    if (err) {      
      res.send({ success: false });
    } else {
      res.send({ success: true });
    }
  });
  
};