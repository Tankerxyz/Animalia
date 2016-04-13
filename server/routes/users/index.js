var users = require('../../controllers/users');
var check = require('../../controllers/checkers');


module.exports = function(app) {
  app.get("/api/users", check.isTrueUser, check.isAdmin,  users.getAll);
  app.get("/api/user/:id", check.isTrueUser, check.isAdmin, check.isCorrectId, users.get);
  
  
  app.post("/api/user/:id", check.isTrueUser, check.isAdmin, check.isCorrectId, users.add);
  
  
  app.put("/api/user/:id", check.isTrueUser, check.isAdmin, check.isCorrectId, users.edit);
  
  
  app.delete("/api/user/:id", check.isTrueUser, check.isAdmin, check.isCorrectId, users.delete);    
}