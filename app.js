const express = require('express');
const app = express();
const logger = require("morgan");
const session = require("express-session");
const RedisStore = require('connect-redis')(session);

//////////////////////////////////////////////////////////////////////
/*                         Middle Ware                              */
//////////////////////////////////////////////////////////////////////

app.use(logger("dev"));

// U R L E N C O D E D

// This middleware will decode data from forms that
// use the POST method.
// When the "extended" option is set to `true`, arrays and objects
// will be support in the url encoding.
app.use(express.urlencoded({ extended: true })); // bodyParser
// The data from the form will be available on the
// `request.body` property instead of the `request.query`.

// J S O N   A P I

app.use(express.json()) // required for building a json api in express.

// S E S S I O N

const localRedis = { port: 6379, host: 'localhost' };
const deployedRedis = { url: process.env.REDIS_URL };

const genuuid = () => {
  return "Session ID"
}

var sess = {
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  userId: null,
  name: "COOOKIE!!!!",
  secret: 'Coookie Monster',
  store: new RedisStore((process.env.NODE_ENV === 'production') ? deployedRedis : localRedis),
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            HttpOnly: false,
            path: '/' }
}
 
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
 
app.use(session(sess))

// app.get('/', function(req, res, next) {
//   console.log("req.session", req.session);
//   if (req.session.views) {
//     req.session.views++
//     res.setHeader('Content-Type', 'text/html')
//     res.write('<p>views: ' + req.session.views + '</p>')
//     res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//     res.end()
//   } else {
//     req.session.views = 1
//     res.end('welcome to the session demo. refresh!')
//   }
// })

//////////////////////////////////////////////////////////////////////
/*                            Routes                                */
//////////////////////////////////////////////////////////////////////

const venuesRouter = require("./routes/venues");
app.use("/", venuesRouter);

const usersRouter = require("./routes/users");
app.use("/", usersRouter);

const sessionRouter = require("./routes/session")
app.use("/", sessionRouter);

//////////////////////////////////////////////////////////////////////
/*                            Server                                */
//////////////////////////////////////////////////////////////////////

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`📡  Listening on port ${port}`));