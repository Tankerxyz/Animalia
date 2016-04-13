var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Photo = new Schema({
  name: String,
  url: String,
  author: String,
  date: { type: Date, default: Date.now },
  info: {
    age: String,
    conditions: [String],
    geography: [String],
    place: String
  }
});

module.exports = mongoose.model('Photo', Photo);
