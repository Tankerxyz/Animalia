var crypto = require('crypto');
var util = require('util');

var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;
var reg = {
  login: /^[a-zA-Z][a-zA-Z0-9-_\.]{4,20}$/
};

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function(v) {
        return reg.login.test(v);
      }
    }
  },
  hashedPassword: {
    type: String,
    required: true
  },
  usertype: {
    type: Number,
    default: 3  // 1-admin | 2-contentManager | 3-user
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

UserSchema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() { return this._plainPassword; });


UserSchema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model('User', UserSchema);