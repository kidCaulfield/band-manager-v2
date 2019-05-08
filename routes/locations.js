const express = require('express');
const router = express.Router();

router.get('/locations', (req, res) => {
  res.status(200).send("time to smoke 'em if you got 'em!")
});

module.exports = router;