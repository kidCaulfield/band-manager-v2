const express = require("express");
const router = express.Router();
const cors = require('cors');
const sessionController = require("../controllers/session");

var whitelist = ['http://localhost:3030', 'localhost:3030', ]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      console.log('hello cors');
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

router.post("/session", cors(corsOptions), sessionController.create);
router.delete("/session", cors(corsOptions), sessionController.destroy);
router.get("/session", cors(corsOptions), sessionController.sessionInProgress)

module.exports = router;