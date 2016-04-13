var Animal = require('../../../models/animals.js');
var AnimalOfTheDay = require('../../../models/animalOfTheDay.js');
var async = require('async');



module.exports = function(req, res, next) {

  async.waterfall([
    function(cb) {
      var dateNow = new Date().toLocaleDateString();

      AnimalOfTheDay.findOne({ date: dateNow  }, cb);
    },
    function(data, cb) {
      
      if (data) {
        var element = data.animals.reduce(function(max, current) {
          return current.views > max.views ? current : max;
        });

        cb(null, element);
      } else {
        cb(true);
      }
    },
    function(element, cb) {

      Animal.findOne({ _id: element.id }, { views: 0, __v: 0 }, cb);
    },
    function(animal, cb) {

      if (animal) {
        var data = {
          title: animal.title,
          url: animal.url,
          _id: animal._id,
          countPhotos: animal.photos.length,
          photos: []
        };


        for (var i = 0; i < 3; ++i) {
          if (animal.photos[i]) {
            data.photos.push({
              url: animal.photos[i].url,
              id: animal.photos[i]._id,
            });
          }
        }

        cb(null, data);
      } else {
        cb(true);
      }
    }
  ], function(err, result) {

    if (err) {
      res.status(404).end();
    } else {
      res.json(result)
    }
  });
};