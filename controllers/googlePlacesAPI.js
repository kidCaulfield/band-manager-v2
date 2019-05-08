const axios = require('axios');
const Joi = require("joi");
const key = require('../config');

const validateSearch = (requestBody, response) => {
let { name, address } = requestBody
const schema = Joi.object().keys({
      id: Joi.number(),
      name: Joi.string().required(),
      address: Joi.string(),
      geo: Joi.any().required(),
      place_id: Joi.any().allow(null),
      international_phone_number: Joi.any().allow(null),
      vicinity: Joi.any().allow(null),
      formatted_address: Joi.any().allow(null),
      website: Joi.any().allow(null),
      created_at: Joi.any(),
      updated_at: Joi.any()
  })

  const result = Joi.validate(requestBody, schema, (err) => {
    if (err) {
      console.log('err: ', err);
      response.status(422).json({
        error: `${err.details[0].message}`,
      })
    }
    return err
  })
  return result;
}

module.exports = {
  async nearbySearch(req, res, next) {
    const valid = validateSearch(req.body, res)
    if (valid === null) {
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
      };
    };
  },
  async locate(req, res, next) {
    return null
  }
};

