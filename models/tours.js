const knex = require("../db/client");

module.exports = class Tour {
  constructor({id, title, band, user_id, created_at, updated_at}) {
    this.id = id;
    this.title = title;
    this.band = band;
    this.user_id = user_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async findTourById(id) {
    const tour = await knex("tours")
      .where("id", id)
      .first()

    return tour;
  }

  static async authorize(id, uid) {
    let key;
    const tour = await knex("tours")
      .where("id", id)
      .first()
    tour.user_id == uid ? key = true : key = false;
    return key;
  }

  static async findUsersTours(id) {
    const tours = await knex("tours")
      .where("user_id", id)
      .orderBy("created_at", "asc");

    return tours;
  }

  static async deleteTour(id) {
    const tour = await knex("tours")
      .where("id", id)
      .del()

    return tour;
  }

  static async updateTour(id, request) {
    const {title, band} = request;
    const tour = await knex("tours")
      .where("id", id)
      .update({
        title,
        band
      }).returning("*")

    return tour
  }

  async save(uid) {
    const {title, band, user_id} = this;
    const tour = await knex("tours")
      .insert({
        title,
        band,
        user_id: uid
      }).returning("id");

    return tour;
  }
}