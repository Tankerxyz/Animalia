var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  login: String,
  password: String,
  sault: String,
  usertype: {type: Number, default: 1}, /*1 - user | 2 - content manager | 3 - admin */
});

module.exports = mongoose.model('User', User);
