const knex = require("../db/client");
const Joi = require('joi');

module.exports = {
  async index(req, res, next) {
    const { userId } = req.session
    const tours = await knex("tours")
      .where("user_id", userId)
      .orderBy("created_at", "asc")

      res.status(200).json({tours})
  },
  async show(req, res, next) {
    const { id } = req.params

    const tour = await knex("tours")
      .where("id", id)
      .first()

    res.status(200).json({tour})
  },
  async create(req, res, next) {
    const {title, band} = req.body.tours
    try {
    let tour;
    tour = await knex("tours")
      .insert({
        title,
        band,
        user_id: req.session.userId
      }).returning("id")

      res.status(200).json({tour})
    } catch (err) {
      next(err)
    }
  }
}