const express = require('express');
const app = express();
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const connectRedis = require("connect-redis");

// T E M P L A T E  V A R I A B L E S
// Initialize errors to an empty array to avoid crashes
// when there are no validation errors
//app.locals.errors = [];

//////////////////////////////////////////////////////////////////////
/*                         Middle Ware                              */
//////////////////////////////////////////////////////////////////////

app.use(logger("dev"));

// URLENCODED

// This middleware will decode data from forms that
// use the POST method.
// When the "extended" option is set to `true`, arrays and objects
// will be support in the url encoding.
app.use(express.urlencoded({ extended: true })); // bodyParser
// The data from the form will be available on the
// `request.body` property instead of the `request.query`.

// this is a key piece of middle ware to run a json api.
app.use(express.json())

// SESSION

const genuuid = () => {
  return "Session ID"
}

var sess = {
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  name: "COOOOOKIE!!!",
  secret: 'Coookie Monster',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}
 
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
 
app.use(session(sess))

app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})


//////////////////////////////////////////////////////////////////////
/*                            Routes                                */
//////////////////////////////////////////////////////////////////////

const venuesRouter = require("./routes/venues");
app.use("/", venuesRouter);

const usersRouter = require("./routes/users");
app.use("/", usersRouter);

// const sessionRouter = require("./routes/session");
// app.use("/", sessionRouter);

//////////////////////////////////////////////////////////////////////
/*                            Server                                */
//////////////////////////////////////////////////////////////////////

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`📡  Listening on port ${port}`));