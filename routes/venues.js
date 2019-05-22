const express = require("express");
const router = express.Router();
const venuesController = require("../controllers/venues")
const cors = require('cors');
const conf = require("./cors");

router.options("*", cors(conf.corsOptionsDelegate))
router.get('/venues', cors(conf.corsOptionsDelegate), conf.preFlight, venuesController.index);
router.post('/venues', cors(conf.corsOptionsDelegate), conf.preFlight, venuesController.create);
router.get("/venues/:id", cors(conf.corsOptionsDelegate), conf.preFlight, venuesController.show);
router.delete("/venues/:id", cors(conf.corsOptionsDelegate), conf.preFlight, venuesController.destroy);
router.get('/venue/:id', cors(conf.corsOptionsDelegate), conf.preFlight, venuesController.edit);
router.patch('/venue/:id', cors(conf.corsOptionsDelegate), conf.preFlight, venuesController.update)

module.exports = router;