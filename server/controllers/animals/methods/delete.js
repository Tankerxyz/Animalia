var Animal = require('../../../models/animals.js');
var AnimalOfTheDay = require('../../../models/animalOfTheDay.js');
var MostPopularAnimal = require('../../../models/mostPopularAnimal.js');
var async = require('async');



module.exports = function(req, res, next) {  
    
  async.waterfall([
    function(cb) {
      Animal.remove({ _id: req.params.id }, function() {
        cb(null, req.params.id);
      });
    },
    function(id, cb) {
      var dateNow = new Date().toLocaleDateString();
      
      AnimalOfTheDay.findOne({ date: dateNow }, function(err, data) {
        if (data) {
          data.views = 0;
          data.save(function() {
            cb(null, id);
          })
        } else {
          cb(null, id);
        }
      });
    },
    function(id, cb) {
      MostPopularAnimal.remove({ animalId: id}, function(err, data) {
        cb(null);
      })
    }
  ], function() {
    res.send({ success: true });
  });
};