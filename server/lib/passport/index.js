var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('../../models/user');

passport.use( new LocalStrategy(
  function(username, password, done) {
    
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.checkPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, { username: user.username,
                          usertype: user.usertype,
                          });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  User.findOne({ username: username }, { username: 1, usertype: 1, _id: 0 }, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;