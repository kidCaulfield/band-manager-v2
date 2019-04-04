const express = require("express");
const router = express.Router();
const toursController = require("../controllers/tours")

router.get('/tours', toursController.index);
router.get('/tours/:id', toursController.show);
router.post('/tours', toursController.create);
router.patch('/tours/:id', toursController.update);

module.exports = router;