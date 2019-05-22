const express = require('express');
const router = express.Router();
const eventsController = require("../controllers/events");
const authenticateUser = require("./authenticate");
const cors = require('cors');
const conf = require("./cors");

router.options("*", cors(conf.corsOptionsDelegate));
router.get("/tours/:tourId/events", cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, eventsController.index);
router.get("/tours/:tourId/events/:id", cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, eventsController.show);
router.post("/tours/:tourId/events", cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, eventsController.create);
router.delete("/tours/:tourId/events/:id", cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, eventsController.destroy);
router.get("/tours/:tourId/event/:id", cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, eventsController.edit);
router.patch("/tours/:tourId/event/:id", cors(conf.corsOptionsDelegate), conf.preFlight, authenticateUser, eventsController.update);

module.exports = router;