const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const logger = require("morgan");
const session = require("express-session");
const RedisStore = require('connect-redis')(session); // will not work in dev without redis installed and running locally
const crypto = require('crypto');

//////////////////////////////////////////////////////////////////////
/*                         Middle Ware                              */
//////////////////////////////////////////////////////////////////////
app.use( express.static( `./band-manager-client/build` ) );
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
  return crypto.randomBytes(64).toString('hex');
}

var sess = {
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  userId: null,
  name: "COOOKIE!!!!",
  secret: crypto.randomBytes(64).toString('hex'),
  // fire up your redis server for dev with "redis-server /usr/local/etc/redis.conf"
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


//////////////////////////////////////////////////////////////////////
/*                            Routes                                */
//////////////////////////////////////////////////////////////////////

app.options('*', cors({
  origin: ['http://localhost:3030'],
  credentials: true,
}))

const venuesRouter = require("./routes/venues");
app.use("/api", venuesRouter);

const toursRouter = require("./routes/tours");
app.use("/api", toursRouter);

const eventsRouter = require("./routes/events");
app.use("/api", eventsRouter);

const googleRouter = require("./routes/googleAPI");
app.use("/api", googleRouter);

const locationsRouter = require("./routes/locations");
app.use("/api", locationsRouter);

const usersRouter = require("./routes/users");
app.use("/api", usersRouter);

const sessionRouter = require("./routes/session")
app.use("/api", sessionRouter);

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, './band-manager-client/build/index.html'));
})

//////////////////////////////////////////////////////////////////////
/*                            Server                                */
//////////////////////////////////////////////////////////////////////

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`📡  Listening on port ${port}`));