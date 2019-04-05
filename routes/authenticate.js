module.exports = function authenticateUser(req, res, next) {
  if (!req.session.userId) {
    res.status(401).json({error: "You must be signed in"});
  }
  next();
}