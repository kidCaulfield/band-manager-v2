const express = require("express");
const router = express.Router();
const toursController = require("../controllers/tours")
const authenticateUser = require("./authenticate");
const cors = require('cors');
const conf = require("./cors");

router.options("*", cors(conf.corsOptionsDelegate))
router.get('/tours', cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, toursController.index);
router.get('/confirmedtours', cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, toursController.indexConfirmedTours);
router.get('/tours/:id', cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, toursController.show);
router.post('/tours', cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, toursController.create);
router.delete('/tours/:id', cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, toursController.destroy);
router.patch('/tour/:id', cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, toursController.update);


module.exports = router;