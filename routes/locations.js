const express = require('express');
const router = express.Router();
const locationsController = require("../controllers/locations");

router.get('/locations', (req, res) => {
  res.status(200).send("time to smoke 'em if you got 'em!")
});

router.post('/locations', locationsController.create);

module.exports = router;