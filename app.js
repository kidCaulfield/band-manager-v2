const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const logger = require("morgan");

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

//////////////////////////////////////////////////////////////////////
/*                            Routes                                */
//////////////////////////////////////////////////////////////////////

const venuesRouter = require("./routes/venues")
app.use("/", venuesRouter);

const usersRouter = require("./routes/users")
app.use("/", usersRouter);

//////////////////////////////////////////////////////////////////////
/*                            Server                                */
//////////////////////////////////////////////////////////////////////

app.listen(port, () => console.log(`📡  Listening on port ${port}`));