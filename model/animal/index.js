var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnimalSchema = new Schema({
  title: String,
  sciTaxonomy: {
    name: String,
    class: String,
    order: String,
    family: String,
    genus: String,
  },
  characteristic: {
    size: String,
    weight: String,
    lifeSpan: String,
    speed: String,
    biome: String     
  },
  lifeStyle: {
    diet: String,
    nutrilion: String,
    mattingHabbits: String,
    maturityAge: Number,
    pregnancy: Number,
    reproduction: String
  },
  population: {
    status: String,
    number: Number,
    threats: String,
    hunting: String
  },
  facts: [String],
  views: Number,
  photos: []
});

module.exports = mongoose.model('Animal', Animal);