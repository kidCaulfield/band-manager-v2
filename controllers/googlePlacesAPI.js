const axios = require('axios')

module.exports = {
  async nearbySearch(req, res, next) {
    const { name, geo} = req.body;
    console.log('geo: ', geo);
    console.log('req.body: ', req.body);
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.2599155,-123.0964901&radius=50&name=biltmore_cabaret&keyword=biltmore_cabaret&key=AIzaSyCSbAOYHghGtm0iqrQ2PxPEMT7GiMfgqF8',
                                {
                                  headers: {'Content-Type': 'aplication.json'}
                                })
    console.log('response: ', response.data);
    res.status(200).json(response.data);
  }
};

