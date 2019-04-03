const express = require("express");
const router = express.Router();
const venuesController = require("../controllers/venues")

router.get('/venues', venuesController.index);
router.post('/venues', venuesController.create);
router.get("/venues/:id", venuesController.show);
router.delete("/venues/:id", venuesController.destroy);
router.get('/venues/:id', venuesController.edit);
router.patch('/venues/:id', venuesController.update)

module.exports = router;