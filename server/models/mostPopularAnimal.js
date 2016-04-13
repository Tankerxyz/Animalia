var mongoose = require('../lib/mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var MostPopularAnimalShema = new Schema({
  animalId: { type: Schema.Types.ObjectId, required: true, ref: 'Animal' },
  views:    { type: Number, default: 1 },
});

MostPopularAnimalShema.plugin(mongoosePaginate);

module.exports = mongoose.model('mostPopularAnimal', MostPopularAnimalShema);