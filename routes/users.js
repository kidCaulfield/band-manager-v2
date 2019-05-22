const express = require("express");
const router = express.Router();
const cors = require('cors');
const usersController = require("../controllers/users")
const authenticateUser = require("./authenticate");
const conf = require("./cors");

router.options("*", cors(conf.corsOptionsDelegate));
router.get('/users', cors(conf.corsOptionsDelegate), conf.preFlight, (req, res) => {
  res.status(200).send("Smoke them if you got them!");
});

router.get('/users/:id', cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, usersController.show);
router.post('/users', cors(conf.corsOptionsDelegate), conf.preFlight, usersController.create);
router.delete('/users/:id', cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, usersController.destroy);
router.get('/user/:id', cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, usersController.edit);
router.patch('/user/:id', cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, usersController.update);

module.exports = router;