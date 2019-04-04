const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users")

function authenticateUser(req, res, next) {
  if (!req.session.userId) {
    res.status(401).json({error: "You must be signed in"});
  }
  next();
}

router.get('/users', (req, res) => {
  res.status(200).send("Smoke them if you got them!");
});

router.get('/users/:id', authenticateUser, usersController.show);
router.post('/users', usersController.create);
router.delete('/users/:id', authenticateUser, usersController.destroy);
router.get('/users/:id', authenticateUser, usersController.edit);
router.patch('/users/:id', authenticateUser, usersController.update);

module.exports = router;