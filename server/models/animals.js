var mongoose = require('../lib/mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var reg = {
  desc: /^[a-zA-Z0-9/W ]{6,10000}$/,
  name: /^[a-zA-Z0-9/W ]{6,50}$/,
  str: /^[a-zA-Z]{3,25}$/,
  url: /^[a-zA-Z0-9]{3,50}$/,
  title: /^[a-zA-Z ]{5,30}$/,
  number: /^[0-9]{1,8}$/,
  size: /\d{1,3}.\d{1,3}m - \d{1,3}.\d{1,3}m/,
  weight: /\d{1,6}kg - \d{1,6}kg/,
  lifeSpan: /\d{1,3} - \d{1,6} [\w]{1,10}/,
  speed: /\d{1,5} \w{1,10}\/\w{1,3}/,
  maturityAge: /\d{1,3} [\w]{1,10}/
}

var AnimalSchema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return reg.url.test(v);
      }
    }
  },
  title: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return reg.title.test(v);
      }
    }
  },
  sciTaxonomy: {
    name: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.name.test(v);
      }
    } },
    class: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.str.test(v);
      }
    } },
    order: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.str.test(v);
      }
    } },
    family: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.str.test(v);
      }
    } },
    genus: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.str.test(v);
      }
    } },
  },
  characteristic: {
    size: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.size.test(v);
      }
    } },
    weight: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.weight.test(v);
      }
    } },
    lifeSpan: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.lifeSpan.test(v);
      }
    } },
    speed: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.speed.test(v);
      }
    } },
    biome: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.str.test(v);
      }
    } }
  },
  lifeStyle: {
    diet: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.str.test(v);
      }
    } },
    nutrilion: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.desc.test(v);
      }
    } },
    mattingHabbits: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.desc.test(v);
      }
    } },
    maturityAge: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.maturityAge.test(v);
      }
    } },
    pregnancy: { type: Number, required: true,
    validate: {
      validator: function(v) {
        return reg.number.test(v);
      }
    } },
    reproduction: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.str.test(v);
      }
    } }
  },
  population: {
    status: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.str.test(v);
      }
    } },
    number: { type: Number, required: true,
    validate: {
      validator: function(v) {
        return reg.number.test(v);
      }
    } 
  },
    threats: { type: String, required: true,
    validate: {
      validator: function(v) {
        return reg.desc.test(v);
      }
    } 
  },
    hunting: { type: String,
       required: true,
    validate: {
      validator: function(v) {
        return reg.desc.test(v);
      }
    } 
  }
  },
  facts: [String],
  views: { type: Number, required: true, default: 0 },
  photos: [require('./photo').schema]
});

AnimalSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Animal', AnimalSchema);