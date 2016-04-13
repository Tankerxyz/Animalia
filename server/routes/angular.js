module.exports = function(app, passport) {
  app.all("/*", function(req, res, next) {
   return next(); 
  })
}
