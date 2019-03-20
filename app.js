const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


//////////////////////////////////////////////////////////////////////
/*                            Routes                                */
//////////////////////////////////////////////////////////////////////

const indexRouter = require("./routes/index")
app.use("/", indexRouter);

//////////////////////////////////////////////////////////////////////
/*                            Server                                */
//////////////////////////////////////////////////////////////////////

app.listen(port, () => console.log(`📡  Listening on port ${port}`));