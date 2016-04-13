var config = require('./config');
var app = require('./lib/app');

require('./routes')(app);

app.listen(config.get('server:port'), function() {
  console.log('Server is listerning on port ' + config.get('server:port'));
});