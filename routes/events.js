const express = require('express');
const router = express.Router();
const eventsController = require("../controllers/events");
const authenticateUser = require("./authenticate");

router.get("/tours/:tourId/events", authenticateUser, eventsController.index);
router.get("/tours/:tourId/events/:id", authenticateUser, eventsController.show);
router.post("/tours/:tourId/events", authenticateUser, eventsController.create);
router.delete("/tours/:tourId/events/:id", authenticateUser, eventsController.destroy);
router.get("/tours/:tourId/event/:id", authenticateUser, eventsController.edit);
router.patch("/tours/:tourId/event/:id", authenticateUser, eventsController.update);

module.exports = router;