const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/session");

router.post("/session", sessionController.create);
router.delete("/session", sessionController.destroy);
router.get("/session", sessionController.sessionInProgress)

module.exports = router;