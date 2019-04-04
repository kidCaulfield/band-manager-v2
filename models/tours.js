const knex = require("../db/client");

module.exports = class Tour {
  constructor({id, title, band, user_id, created_at, updated_at}) {
    this.id = id;
    this.title = title;
    this.band = band;
    this.user_id = user_id;
    this.created_at = created_at;
    this,updated_at = updated_at;
  }

  static async findTourById(id) {
    const tour = await knex("tours")
      .where("id", id)
      .first()

    return tour;
  }

  static async findUsersTours(id) {
    const tours = await knex("tours")
      .where("user_id", id)
      .orderBy("created_at", "asc");

    return tours;
  }

  static async updateTour(id, request) {
    const {title, band} = request;
    console.log('title: ', title);
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