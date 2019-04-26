const axios = require('axios');
const key = require('../config');

module.exports = {
  async nearbySearch(req, res, next) {
    const { name, geo} = req.body;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.2599155,-123.0964901&radius=50&name=biltmore_cabaret&keyword=biltmore_cabaret&key=${key.googleAPIKey}`,
                                {
                                  headers: {'Content-Type': 'aplication.json'}
                                })
    console.log('response: ', response.data);
    res.status(200).json(response.data);
  }
};

