var Animal = require('../../../models/animals.js');
var AnimalOfTheDay = require('../../../models/animalOfTheDay.js');
var MostPopularAnimal = require('../../../models/mostPopularAnimal.js');
var async = require('async');
var inspect = require('util').inspect;


module.exports = function(req, res, next) {

  var dateNow = new Date().toLocaleDateString();

  async.waterfall([
    function(cb) {
      Animal.findOne({ url: req.params.url }, { photos: 0, __v: 0 }, cb)
    },
    function(animal, cb) {
      AnimalOfTheDay.findOne({ date: dateNow }, function(err, data) {
        cb(err, animal, data)
      });
    },
    function(animal, data, cb) {
      if (data) {
        var isExist = false;
        for (var i = 0; i < data.animals.length; ++i) {
          if (data.animals[i].id.toString() == animal._id.toString()) {
            data.animals[i].views++;
            isExist = true;
          }
        }

        if (!isExist) {
          data.animals.push({
            id: animal._id
          });
        }

        data.save(function(err) {
          cb(err, animal);
        })

      } else {

        var popularAnimals = new AnimalOfTheDay({
          date: dateNow,
          animals: [{
            id: animal._id
          }]
        });

        popularAnimals.save(function(err, data) {
          if (err) {
            cb(true);
          } else {
            cb(null, animal)
          }
        })
      }
    },
    function(animal, cb) {
      MostPopularAnimal.findOne({ animalId: animal._id }, function(err, data) {

        cb(err, data, animal)
      })
    },
    function(data, animal, cb) {

      if (data) {
        data.views++;
        data.save(function(err, data) {
        
          if (err) {
            cb(true);
          } else {
            cb(null, animal)
          }
        });
      } else {
                
        var newAnimal = new MostPopularAnimal({
          animalId: animal._id
        });
        
        newAnimal.save(function(err, data) {
          if (err) {
            cb(true);
          } else {
            cb(null, animal)
          }
        });
      }
    }
  ], function(err, animal) {
    if (err) {
      res.status(500).end();
    } else {
      res.send({ success: true, message: animal });
    }
  });
};