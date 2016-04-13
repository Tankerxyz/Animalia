var photos = require('../../controllers/photos');
var check = require('../../controllers/checkers');


module.exports = function(app) {
  app.get("/api/animals/:id/photos", check.isCorrectId, photos.getAllById);
  app.get("/api/animals/url/:url/photos", check.isCorrectUrl, photos.getAllByUrl);  
  app.get('/api/animals/:id/photos/:idPhoto', check.isCorrectId, photos.getFullInfo);
  app.get('/api/animals/:id/photosAll', check.isCorrectId, photos.getFullInfoAll);
  app.get('/api/:idAnimal/:idPhoto/:small', check.isCorrectId,  photos.getImage);
  
  
  app.post("/api/photos/:id", check.isTrueUser, check.isCorrectId, photos.addPhotos);
  app.post('/api/:idAnimal', check.isTrueUser, check.isCorrectId, photos.remove);
  
  
  app.put("/api/animal/:idAnimal/photo/:idPhoto", check.isTrueUser, check.isCorrectId, photos.edit);
  
  
  app.delete("/api/animal/:idAnimal/photo/:idPhoto", check.isTrueUser, check.isCorrectId, photos.delete);
}