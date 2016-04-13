var passport = require('../../lib/passport');
var authenticates = require('../../controllers/authenticates');

module.exports = function(app) {
  app.get('/api/logout', authenticates.logout);
  app.get('/api/auth', authenticates.auth);
  
  
  app.post('/api/login', passport.authenticate('local'), authenticates.login);
  app.post('/api/register', authenticates.register);
};