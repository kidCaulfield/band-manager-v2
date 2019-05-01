const axios = require('axios');
const key = require('../config');

module.exports = {
  async nearbySearch(req, res, next) {
    const { name, geo } = req.body;
    const searchName = name.split(" ").map(word => word.toLowerCase()).join("_").trim()
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${geo.latitude},${geo.longitude}&radius=100&name=${searchName}&keyword=${searchName}&key=${key.googleAPIKey}`,
                          {headers: {'Content-Type': 'aplication.json'}})
      console.log('response.data: ', response.data);
    if (response.data.status === 'OK') {
      const placeDetails = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${response.data.results[0].place_id}&fields=name,place_id,website,formatted_address,vicinity,international_phone_number&key=${key.googleAPIKey}`,
                          {headers: {'Content-Type': 'aplication.json'}})
      console.log('placeDetails.data.result: ', placeDetails.data.result);
      res.status(200).json(placeDetails.data.result);
    } else {
      res.status(200).json(null);
    }
  }
};

