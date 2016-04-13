var Animal = require('../../../models/animals.js');
var MostPopularAnimal = require('../../../models/mostPopularAnimal.js');
var async = require('async');



module.exports = function(req, res, next) {

  async.waterfall([
    function(cb) {
      var options = {
        sort: { views: -1 },
        limit: req.params.limit,
        page: req.params.page,
        offset: req.params.offset,
        lean: true,
        populate: {
          path: 'animalId',
          select: 'url title',
        }
      };


      MostPopularAnimal.paginate({}, options, function(err, data) {
        cb(err, data ? data.docs : null);
      });
    },
    function(animals, cb) {
      if (animals[0] && animals[0].animalId) {
        var arrData = [];
        
        async.eachSeries(animals, function(item, cb) {
          if (item.animalId) {            
            Animal.findOne({ _id: item.animalId._id }, { photos: 1, _id: 0 }, function(err, data) {
              if (err) {
                cb(err);
              } else {

                if (data) {
                  arrData.push({
                    id: item.animalId._id,
                    title: item.animalId.title,
                    url: item.animalId.url,
                    photoId: data.photos[0] ? data.photos[0]._id : ''
                  });
                  cb(null);
                } else {
                  cb(true);
                }
              }
            });
          } else {
            cb(null);
          }
        }, function done(err) {
          if (err) {
            cb(true)
          } else {
            cb(null, arrData)
          }
        });
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