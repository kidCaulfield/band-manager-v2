const express = require('express');
const router = express.Router();
const locationsController = require("../controllers/locations");

router.get('/locations', locationsController.index);
router.get('/countries', locationsController.indexCountries);
router.get('/regions', locationsController.indexRegions);
router.get('/cities', locationsController.indexCities);
router.post('/locations', locationsController.create);

module.exports = router;