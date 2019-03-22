const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const logger = require("morgan");
const methodOverride = require("method-override");

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

// METHOD OVERRIDE

app.use(
  methodOverride((req, res) => {
    if (typeof req.body === "object" && req.body._method) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

//////////////////////////////////////////////////////////////////////
/*                            Routes                                */
//////////////////////////////////////////////////////////////////////

const indexRouter = require("./routes/index")
app.use("/", indexRouter);

//////////////////////////////////////////////////////////////////////
/*                            Server                                */
//////////////////////////////////////////////////////////////////////

app.listen(port, () => console.log(`📡  Listening on port ${port}`));