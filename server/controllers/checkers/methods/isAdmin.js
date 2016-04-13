module.exports = function(req, res, next) {
  if (!(req.user.usertype == 1)) {
    res.status(401).send({ success: false });
  } else {
    next();
  }
};