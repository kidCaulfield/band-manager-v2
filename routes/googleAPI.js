const express = require("express");
const router = express.Router();
const googlePlacesController = require("../controllers/googlePlacesAPI");


router.post("/google-places", googlePlacesController.nearbySearch)

module.exports = router;