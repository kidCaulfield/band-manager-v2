// const express = require("express");
// const router = express.Router();
const knex = require("../db/client");
const Joi = require('joi')

module.exports = {
  async index(req, res) {

    // Whenever you need to use the method `then` with a callback to get a value
    // from asynchronous code, you can instead use keyword `await` to for that value
    // only inside functions or methods that are prefixed with the keyword `async`

    try {
    const venues = await knex("venues").orderBy("id", "asc");
    console.log(`venues request`); // find out how to log the IP of the computer requesting
    res.status(200).json({ venues });
    } catch (error) {
      next(error)
    }

  },

  // This seems unecessary may be removed
  async show(req, res, next) {
    const { id } = req.params;

    try {
      const venue = await knex("venues")
        .where("id", id)
        .first();
      
      // something to test later
      // const reviews = await Review.forReviewWithUsers(post.id);

      res.status(200).json({venue});
    } catch (error) {
      next(error);
    }
  },
  create: [
    async (req, res, next) => {

      const schema = Joi.object().keys({
        venues: {
          name: Joi.string().trim().required(),
          address: Joi.string().required(),
          phone_number: Joi.any().allow(null),
          geo: Joi.any().allow(null)
        }
      });

      Joi.validate(req.body, schema, (err, result) => {
        if (err) {
          console.log('err: ', err);
          res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: res.body
          });
        }
      })
      
      // Make Sure to activate app.use(express.json()); in middle where to enable json req
      
      const { name, address, phone_number, geo } = req.body.venues;
      
      try {
      const venue = await knex("venues")
        .insert({
            name,
            address,
            phone_number,
            geo
        })
        .returning("id")
        res.status(200).json({venue});
      } catch (error) {
      next(error)
      }
    
    }
  ],
  async destroy(req, res) {
    const { id } = req.params;

    const venue = await knex("venues")
      .where("id", id)
      .del()

      res.status(200).send(`Venue at id: ${id} has been deleted`)
   },
  async edit(req, res) {
    const { id } = req.params;

    const venue = await knex("venues")
      .where("id", id)
      .first()

      res.status(200).json({venue});
  },
  async update(req, res) {
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
      next(error)
      }
  }
}