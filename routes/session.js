const express = require("express");
const router = express.Router();
const cors = require('cors');
const sessionController = require("../controllers/session");
const conf = require("./cors");

router.options("*", cors(conf.corsOptionsDelegate));
router.post("/session", cors(conf.corsOptionsDelegate), conf.preFlight, sessionController.create);
router.delete("/session", cors(conf.corsOptionsDelegate), conf.preFlight, sessionController.destroy);
router.get("/session", cors(conf.corsOptionsDelegate), conf.preFlight, sessionController.sessionInProgress)

module.exports = router;