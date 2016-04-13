module.exports = function(req, res, next) {
  for (var key in req.params) {
    if (key.indexOf('id') != -1) {
      if (!(/^[0-9a-fA-F]{24}$/.test(req.params[key]))) {
        return res.status(400).end();
      }
    }
  }
  next();
};