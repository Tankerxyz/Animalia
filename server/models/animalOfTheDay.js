var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;

var AnimalOfTheDayShema = new Schema({
  date:      { type: String, default: new Date().toLocaleDateString() },
  animals:[{ 
    id:      { type: Schema.Types.ObjectId, required: true },
    views:   { type: Number, default: 0 }
   }]
});

module.exports = mongoose.model('animalOfTheDay', AnimalOfTheDayShema);