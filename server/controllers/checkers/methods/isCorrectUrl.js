module.exports = function(req, res, next) {
  if (/^[a-zA-Z0-9]{3,50}$/.test(req.params.url)) {
    next();
  } else {
    res.status(401).send({ success: false });
  }
};