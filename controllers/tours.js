const knex = require("../db/client");
const Joi = require('joi');
const Tour = require('../models/tours')

const validateTour = (requestBody, response) => {
  const { title, band } = requestBody.tours;
  const schema = Joi.object().keys({
    tours: {
      title: Joi.string().trim().required(),
      band: Joi.string().trim().required()
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
    if (userId) {
      try {
        const tours = await Tour.findUsersTours(userId);

        res.status(200).json({tours});
      } catch (err) {
        next(err);
      }
    } else {
      res.status(401).json({error: "you must be signed in"});
    }
  },

  async show(req, res, next) {
    if (req.session.userId) {
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
    } else {
      res.status(401).json({error: "You must be signed in"})
    }
  },

  async create(req, res, next) {
    if (req.session.userId) {
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
    } else {
      res.status(401).json({error: "You must be signed in"});
    }
  },

  async destroy(req, res, next) {
    if (req.session.userId) {
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
    } else {
      res.status(401).json({error: "You must be signed in"});
    }
  },

  async update(req, res, next) {
    if (req.session.userId) {
      const valid = validateTour(req.body, res);
      if (valid === null) {
        try{
          const { id } = req.params;
          const authorized = await Tour.authorize(id, req.session.userId)
          if (authorized) {
          const tour = await Tour.updateTour(id, req.body.tours);

          res.status(200).json({tour})
          } else {
            res.status(401).json({error: "You are unauthorized"})
          }
        } catch (err) {
          next(err)
        }
      }
    } else {
      res.status(401).json({error: "You must be signed in"});
    }
  }
}