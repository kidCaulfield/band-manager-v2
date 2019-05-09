const express = require('express');
const router = express.Router();
const locationsController = require("../controllers/locations");

router.get('/locations', locationsController.index);
router.get('/countries', locationsController.indexCountries);
router.post('/regions', locationsController.indexRegions);
router.post('/cities', locationsController.indexCities);
router.post('/locations', locationsController.create);
router.patch('/location/:id', locationsController.update);

module.exports = router;