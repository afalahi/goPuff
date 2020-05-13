function locals(req, res, next) {
  res.locals.user = req.userContext;
  next();
}
module.exports = locals;