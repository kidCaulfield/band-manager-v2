const express = require("express");
const router = express.Router();
const googlePlacesController = require("../controllers/googlePlacesAPI");
const authenticateUser = require("./authenticate");
const cors = require('cors');
const conf = require("./cors");

router.options("*", cors(conf.corsOptionsDelegate));
router.post("/google-places", cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, googlePlacesController.nearbySearch)
router.post("/google-place", cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, googlePlacesController.locationData)

module.exports = router;