const knex = require("../db/client");
const Joi = require('joi');
const Tour = require('../models/tours')

const validateTour = (requestBody, response) => {
  const { title, band } = requestBody.tour;
  const schema = Joi.object().keys({
    tour: {
      title: Joi.string().trim().required(),
      band: Joi.string().trim().required(),
      confirmed: Joi.boolean()
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

  async indexConfirmedTours(req, res, next) {
      try {
        const tours = await Tour.findConfirmedTours();

        res.status(200).json({tours});
      } catch (err) {
        next(err);
      }
  },

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const tour = await Tour.findTourById(id);
      if (tour.user_id == req.session.userId) {
        res.status(200).json({tour});
      } else {
        res.status(401).json({error: "You are unauthorized"})
      }
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
        const newTour = new Tour({title, band});
        const tour = await newTour.save(userId);

        res.status(200).json({tour})
      } catch (err) {
        next(err)
      }
    }
  },

  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const authorized = await Tour.authorize(id, req.session.userId)
      if (authorized) {
        const deleted = await Tour.deleteTour(id);

        res.status(200).send(`Tour at id: ${id} has been deleted`)
      } else (
        res.status(401).json({error: "You are unauthorized"})
      )
    } catch (err) {
    next(err);
    }
  },

  async update(req, res, next) {
    console.log('req.body: ', req.body);
    const valid = validateTour(req.body, res);
    if (valid === null) {
      try{
        const { id } = req.params;
        const authorized = await Tour.authorize(id, req.session.userId)
        if (authorized) {
        const tour = await Tour.updateTour(id, req.body.tour);

        res.status(200).json({tour})
        } else {
          res.status(401).json({error: "You are unauthorized"})
        }
      } catch (err) {
        next(err)
      }
    }
  }
}