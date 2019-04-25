const knex = require("../db/client");
const Joi = require("joi");
const Event = require("../models/events");

const validateEvent = (requestBody, response) => {
let { name, address, contact, date_time, confirmed, cancelled} = requestBody.event
const schema = Joi.object().keys({
    event: {
      // refined this schema durring frontend development
      name: Joi.string().required(),
      address: Joi.string().required(),
      contact: Joi.string().required(),
      date_time: Joi.string(),
      confirmed: Joi.boolean(),
      cancelled: Joi.boolean(),
      venue_id: Joi.allow()
    }
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
  async index(req, res, next) {
    try {
      const { userId } = req.session;
      const { tourId } = req.params;
      const events = await Event.findAll({tour_id: tourId, user_id: userId});

      res.status(200).json({events})
    } catch (err) {
      next(err)
    }
  },
  async show(req, res, next) {
    try {
      const { id } = req.params;
      const event = await Event.find(id);
      if (event.user_id == req.session.userId) {
        res.status(200).json({event})
      } else {
        res.status(401).json({error: "You are unauthorized"})
      }
    } catch (err) {
      next(err)
    }
  },
  async create(req, res, next) {
    const valid = validateEvent(req.body, res)
    if (valid === null) {
      try {
      const { userId } = req.session;
      const { name, address, contact, date_time, venue_id} = req.body.event;
      const { tourId } = req.params;
      const newEvent = new Event({ name, address, contact, date_time });
      const event = await newEvent.save(userId, tourId, venue_id);

      res.status(200).json({event});
      } catch (err) {
        next(err);
      };
    };
  },
  async destroy(req, res, next) {
    try{
      const { id } = req.params;
      const { userId } = req.session;
      const authorized = Event.authorize(id, userId);
      if (authorized) {
        const deleted = await Event.deleteEvent(id);

        res.status(200).send(`Event at id: ${id} has been deleted`)
      } else {
        req.status(401).json({error: "You are unauthorized"})
      }
    } catch (err) {
      next(err)
    }
  },
  async edit(req, res, next) {
    try {
      const { tourId, id } = req.params;
      const authorized = await Event.authorize(id, req.session.userId);
      if (authorized) {
        const event = await Event.find(id)

        res.status(200).json({event})
      } else {
        res.status(401).json({error: "You are unauthorized"})
      }
    } catch (err) {
      next (err)
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const authorized = await Event.authorize(id, req.session.userId)
        if (authorized) {
        const event = await Event.updateEvent(id, req.body.event);

        res.status(200).json({event})
        } else {
          res.status(401).json({error: "You are unauthorized"})
        }
    } catch (err) {
      next(err)
    }
  }
};