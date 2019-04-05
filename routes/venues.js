const express = require("express");
const router = express.Router();
const venuesController = require("../controllers/venues")

router.get('/venues', venuesController.index);
router.post('/venues', venuesController.create);
router.get("/venues/:id", venuesController.show);
router.delete("/venues/:id", venuesController.destroy);
router.get('/venue/:id', venuesController.edit);
router.patch('/venue/:id', venuesController.update)

module.exports = router;