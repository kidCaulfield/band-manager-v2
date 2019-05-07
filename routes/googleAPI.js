const express = require("express");
const router = express.Router();
const googlePlacesController = require("../controllers/googlePlacesAPI");
const authenticateUser = require("./authenticate");


router.post("/google-places", authenticateUser, googlePlacesController.nearbySearch)

module.exports = router;