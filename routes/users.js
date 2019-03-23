const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users")


router.get('/users', (req, res) => {
  res.status(200).send("Smoke them if you got them!");
});

router.post('/users', usersController.create);

module.exports = router;