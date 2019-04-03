const express = require("express");
const router = express.Router();
const toursController = require("../controllers/tours")

router.get('/tours', toursController.index);
router.get('/tours/:id', toursController.show);
router.post('/tours', toursController.create);

module.exports = router;