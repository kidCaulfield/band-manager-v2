const knex = require("../db/client");

module.exports = class Event {
  constructor({id, name, address, contact, date_time, confirmed, cancelled} = {}) {
    this.id = id,
    this.name = name, 
    this.address = address,
    this.address = contact,
    this.date_time = date_time,
    this.confirmed = confirmed,
    this.cancelled = cancelled
  }

  static async find(id) {
    const event = await knex("events")
      .where("id", id)
      .first()

    return event;
  }

  async save(uid, tourId, venueId) {
    const {name, address, contact, date_time} = this;
    const event = await knex("events")
      .insert({
        name,
        address,
        date_time,
        contact,
        user_id: uid,
        tour_id: tourId,
        venue_id: venueId
      }).returning("*")

    return event;
  }
}