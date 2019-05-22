module.exports = {
  corsOptionsDelegate(req, callback) {
    var whitelist = ['http://localhost:3030', 'localhost:3030', ]
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  },

  preFlight(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3030');
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
  }
}