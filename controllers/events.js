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
  async show(req, res, next) {
    try {
      const { id } = req.params;
      const event = await Event.find(id);

      res.status(200).json({event})
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
      const event = new Event({ name, address, contact, date_time });
      const newEvent = await event.save(userId, tourId, venue_id);

      res.status(200).json({newEvent});
      } catch (err) {
        next(err);
      };
    };
  }
};