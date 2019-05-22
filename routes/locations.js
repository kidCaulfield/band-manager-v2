const express = require('express');
const router = express.Router();
const locationsController = require("../controllers/locations");
const cors = require('cors');
const conf = require("./cors");

router.options("*", cors(conf.corsOptionsDelegate));
router.get('/locations', cors(conf.corsOptionsDelegate), conf.preFlight, locationsController.index);
router.get('/countries', cors(conf.corsOptionsDelegate), conf.preFlight, locationsController.indexCountries);
router.post('/regions', cors(conf.corsOptionsDelegate), conf.preFlight, locationsController.indexRegions);
router.post('/cities', cors(conf.corsOptionsDelegate), conf.preFlight, locationsController.indexCities);
router.post('/locations', cors(conf.corsOptionsDelegate), conf.preFlight, locationsController.create);
router.patch('/location/:id', cors(conf.corsOptionsDelegate), conf.preFlight, locationsController.update);

module.exports = router;