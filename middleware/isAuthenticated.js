function isAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to be logged in to perform this action');
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
  }
  return next();
}
module.exports = isAuthenticated;