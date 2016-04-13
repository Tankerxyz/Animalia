module.exports = function(req, res, next) {
  if (!req.user || req.user.usertype == 3 || req.user.username !== req.session.passport.user) {
    res.status(401).send({ success: false });
  } else {
    next();
  }
};