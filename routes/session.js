const express = require("express");
const router = express.Router();
const cors = require('cors');
const sessionController = require("../controllers/session");

var whitelist = ['http://localhost:3030', 'localhost:3030', ]
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    console.log('hello cors');
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

const preFlight = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}

router.options("*", cors(corsOptionsDelegate));
router.post("/session", cors(corsOptionsDelegate), preFlight, sessionController.create);
router.delete("/session", cors(corsOptionsDelegate), sessionController.destroy);
router.get("/session", cors(corsOptionsDelegate), sessionController.sessionInProgress)

module.exports = router;