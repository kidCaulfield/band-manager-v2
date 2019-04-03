const express = require("express");
const router = express.Router();
const knex = require("../db/client");
const Joi = require('joi')
const Venue = require("../models/venues");

const validateVenue = (requestBody, response) => {
  let { name, address, phone_number, geo } = requestBody.venues;
  const schema = Joi.object().keys({
    venues: {
      name: Joi.string().trim().required(),
      address: Joi.string().required(),
      phone_number: Joi.any().allow(null),
      geo: Joi.any().allow(null)
    }
  });

  Joi.validate(requestBody, schema, (err, result) => {
    if (err) {
      console.log('err: ', err);
      response.status(422).json({
        status: 'error',
        message: `${err.details[0].message}`,
        data: response.body
      });
    }
  })
}

module.exports = {
  async index(req, res) {
  
    try {
    const venues = await knex("venues").orderBy("id", "asc");
    console.log(`${venues}`); // find out how to log the IP of the computer requesting later
    res.status(200).json({ venues });
    } catch (error) {
      throw error;
    }
  },

  // This seems unecessary for api may be removed later
  async show(req, res, next) {
    const { id } = req.params;

    try {
      const venue = await knex("venues")
        .where("id", id)
        .first();

      res.status(200).json({venue});
    } catch (error) {
      throw error;
    }
  },
  create: [
    async (req, res, next) => {
      validateVenue(req.body, res)

      const { name, address, phone_number, geo } = req.body.venues;
      try {
        let verify = null // trying to solve memory issue
        verify = await Venue.findByName(name)
        //console.log('verify: ', verify); // **this may become a memory issue come back later**
        let venue;
        const sameNameDifferentTown = (location) => location.address != address;
        if (verify.length === 0 || verify.every(sameNameDifferentTown)) {
          venue = new Venue({name, address, phone_number, geo});
          const id = await venue.save()

          res.status(200).json({id});
        } else {
          throw "duplicate venue found"
        }
      } catch (error) {
      throw error;
      }
    }
  ],
  async destroy(req, res) {
    const { id } = req.params;

    try {
    const venue = await knex("venues")
      .where("id", id)
      .del()

      res.status(200).send(`Venue at id: ${id} has been deleted`)
      } catch (error) {
      throw error;
      }
   },
  async edit(req, res) {
    const { id } = req.params;

    try {
    const venue = await knex("venues")
      .where("id", id)
      .first()

      res.status(200).json({venue});
      } catch (error) {
      throw error;
      }
  },
  async update(req, res) {
    validateVenue(req.body, res);

    const { id } = req.params;
    const { name, address, phone_number, geo } = req.body.venues
    
    try {
    const venue = await knex("venues")
      .where("id", id)
      .update({
        name,
        address,
        phone_number,
        geo
      })
      .returning("*")

      res.status(200).json({venue});
      } catch (error) {
      throw error;
      }
  }
}