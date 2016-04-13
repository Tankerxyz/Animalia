var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;

var PhotoSchema = new Schema({
  url:      { type: String },
  extension:{ type: String, required: true },
  name:     { type: String, required: true },
  author:   { type: String, required: true },
  date:     { type: Date, default: Date.now },
  info: {
    age:    { type: String, required: true },
    conditions: [String],
    geography: [String],
    place:  { type: String, required: true }
  }
});

module.exports = mongoose.model('Photo', PhotoSchema);
