var Animal = require('../../../models/animals.js');


module.exports = function(req, res, next) {
  var reg = new RegExp('^' + req.params.str + '.*', 'i');

  Animal.find({ title: reg }, { title: 1, photos: 1, url: 1 }, function(err, data) {
    if (err) {
      res.status(500).end();
    }
    
    if (data) {
      var searchResults = [];

      data.forEach(function(el) {
        searchResults.push({
          title: el.title,
          url: el.url,
          id: el._id,
          photoId: el.photos[0] ? el.photos[0]._id : ''
        });
      });
      
      res.json(searchResults);
    } else {
      res.status(404).end();
    }
  });
};