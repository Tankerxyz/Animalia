var animals = require('../../controllers/animals');
var check = require('../../controllers/checkers');


module.exports = function(app) {   
  app.get("/api/animals", check.isTrueUser, animals.getAll);
  app.get("/api/animal/:id", check.isCorrectId, animals.getById);
  app.get("/api/animal/url/:url", check.isCorrectUrl, animals.getByUrl);
  app.get("/api/animal-of-the-day", animals.getAnimalOfTheDay);
  app.get("/api/most-popular-animals/:limit/:offset/:page", animals.getMostPopularAnimals);
  app.get("/api/find/:str/:limit", animals.find);
  app.get("/api/find-all-min/:str", animals.findAllMin);
  
  
  app.post("/api/animal", check.isTrueUser, animals.create);
  
    
  app.put("/api/animal/:id", check.isTrueUser, check.isCorrectId, animals.edit);
  
  
  app.delete("/api/animal/:id", check.isCorrectId, check.isTrueUser, animals.delete);   
};