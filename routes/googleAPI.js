const express = require("express");
const router = express.Router();
const googlePlacesController = require("../controllers/googlePlacesAPI");
const authenticateUser = require("./authenticate");


router.post("/google-places", authenticateUser, googlePlacesController.nearbySearch)
router.post("/google-place", authenticateUser, googlePlacesController.locationData)

module.exports = router;