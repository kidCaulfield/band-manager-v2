const Joi = require("joi");
const Location = require("../models/locations");

const validateLocation = (requestBody, response) => {
  let { city, geo, country, iso2, region, capital, population, population_proper } = requestBody
  const schema = Joi.object().keys(
    {
      city: Joi.string().required(),
      geo: Joi.any().allow(null),
      country: Joi.string().required(),
      iso2: Joi.string().required(),
      region: Joi.string().allow(null),
      capital: Joi.string().allow(null),
      population: Joi.string().allow(null),
      population_proper: Joi.string().allow(null)
    }
  )

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
  async create(req, res, next) {
    const valid = validateLocation(req.body, res)
    if (valid === null) {
      try {
        const newLocation = new Location(req.body);
        const location = await newLocation.save();
        
        res.status(200).json(location);
      } catch (error) {
        next(error)
      }
    }
  }
};