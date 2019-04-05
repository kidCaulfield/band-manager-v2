const express = require('express');
const router = express.Router();
const eventsController = require("../controllers/events");
const authenticateUser = require("./authenticate");

router.post("/tours/:tourId/events", authenticateUser, eventsController.create);
router.get("/tours/:tourId/events/:id", authenticateUser, eventsController.show);

module.exports = router;