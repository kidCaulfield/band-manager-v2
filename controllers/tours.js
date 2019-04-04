const knex = require("../db/client");
const Joi = require('joi');
const Tour = require('../models/tours')

const validateTour = (requestBody, response) => {
  let schema;
  if (requestBody.tour === undefined) {
    const { title, band } = requestBody.tours;
    schema = Joi.object().keys({
      tours: {
        title: Joi.string().trim().required(),
        band: Joi.string().trim().required()
      }
    });
  } else {
    const { title, band } = requestBody.tour;
    schema = Joi.object().keys({
      tour: {
        title: Joi.string().trim().required(),
        band: Joi.string().trim().required()
      }
    });
  }

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

  async index(req, res, next) {
    const { userId } = req.session;
    try {
    const tours = await Tour.findUsersTours(userId);

      res.status(200).json({tours});
    } catch (err) {
      next(err);
    }
  },

  async show(req, res, next) {
    const { id } = req.params;
    try {
      const tour = await Tour.findTourById(id);

      res.status(200).json({tour});
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    const valid = validateTour(req.body, res);
    if (valid === null) {
      try {
        const {userId} = req.session
        const {title, band} = req.body.tours
        const tour = new Tour({title, band});
        const id = await tour.save(userId);

        res.status(200).json({id})
      } catch (err) {
        next(err)
      }
    }
  },

  async update(req, res, next) {
    const valid = validateTour(req.body, res);
    if (valid === null) {
      try{
        const { id } = req.params;
        const tour = await Tour.updateTour(id, req.body.tours);

        res.status(200).json({tour})
      } catch (err) {
        next(err)
      }
    }
  }
}