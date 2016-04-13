var staticPath = require('path').join(__dirname, './../../public')

module.exports = function(app) {
  
  app.get('/*', function(req, res, next) { 
    var curPath = req.path.split('/');
    
    if (curPath[1] && curPath[1] == 'api') {
      next();
    } else {
      res.sendfile(staticPath + '/index.html');
    }
  });
  
  require('./animals')(app);
  require('./authenticate')(app);
  require('./photos')(app);
  require('./users')(app);
};