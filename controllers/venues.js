const knex = require("../db/client");
const Joi = require('joi')
const Venue = require("../models/venues");

const validateVenue = (requestBody, response) => {
  let { name, address, phone_number, geo } = requestBody.venues;
  const schema = Joi.object().keys({
    venues: {
      name: Joi.string().trim().required(),
      address: Joi.string(),
      international_phone_number: Joi.string().allow(null),
      geo: Joi.any().allow(null),
      place_id: Joi.string().allow(null),
      vicinity: Joi.string().allow(null),
      formatted_address: Joi.string().allow(null),
      website: Joi.string().allow(null)
    }
  });

  const result = Joi.validate(requestBody, schema, (err) => {
    if (err) {
      console.log('err: ', err);
      response.status(422).json({
        error: `${err.details[0].message}`,
      })
    }
    return err
  })
  return result
}

// Add admin User privilages later for Venues CRUD

module.exports = {
  async index(req, res) {
    try {
    const venues = await Venue.allVenues();
    // find out how to log the IP of the computer requesting later
    res.status(200).json({ venues });
    } catch (error) {
      throw error;
    }
  },

  // This seems unecessary for api may be removed later if never used, also edit is the same.
  async show(req, res, next) {
    try {
      const { id } = req.params;
      const venue = await Venue.findById(id);

      res.status(200).json({venue});
    } catch (error) {
      throw error;
    }
  },
  create: [
    async (req, res, next) => {
      const valid = validateVenue(req.body, res)  
      const { name, address, geo } = req.body.venues;  

      if (valid === null) {
        try {
          const verify = await Venue.find({name, address})
          if (verify.length === 0) {
            const venue = new Venue({name, address, geo});
            const id = await venue.save()
            res.status(200).json({id});
          } else {
            throw "duplicate venue found"
          }
        } catch (error) {
        next(error);
        }
      }
    }
  ],
  async destroy(req, res) { // currently no one is authorized to delete venues
    if (req.session.userId) {
      try {
        const { id } = req.params;
        const authorized = await Venue.authorize(id, req.session.userId)
        if (authorized) {
        const deleted = await Venue.deleteTour(id)

        res.status(200).send(`Venue at id: ${id} has been deleted`)
        } else {
          res.status(401).json({error: "You are unauthorized"})
        }
      } catch (error) {
      throw error;
      }
    } else {
      res.status(401).json({error: "You must be signed in"})
    }
   },
  async edit(req, res) {
    try {
    const { id } = req.params;
    const venue = await Venue.findById(id)

      res.status(200).json({venue});
      } catch (error) {
      throw error;
      }
  },
  async update(req, res) {
    const valid = validateVenue(req.body, res);
    if (valid === null) {
    console.log('req.body: ', req.body);
      try {
        const { id } = req.params;
        const venue = await Venue.updateVenue(id ,req.body.venues)

        res.status(200).json({venue});
      } catch (error) {
      throw error;
      }
    }
  }
}