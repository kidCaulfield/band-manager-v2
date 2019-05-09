const knex = require("../db/client");

module.exports = class Event {
  constructor({id, name, address, contact, details, date_time, confirmed, cancelled} = {}) {
    this.id = id,
    this.name = name, 
    this.address = address,
    this.contact = contact,
    this.details = details,
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

  static async findAll(params) {

    const events = await knex("events")
      .select()
      .where(params)
      .orderBy("date_time", "asc")

    const addVenuesToEvents = async (e) => {
      const rebuild = await Promise.all(e.map(async (event) => {
        const venue = await knex("venues").select().where("id", event.venue_id).first();
        event["venue"] = venue;
        return event;
      }))
      return rebuild
    } 

    const fire = await addVenuesToEvents(events)

    return events;
  }

   static async authorize(id, uid) {
    let key;
    const event = await knex("events")
      .where("id", id)
      .first()
    event.user_id == uid ? key = true : key = false;
    return key;
  }

  static async deleteEvent(id) {
    const event = await knex("events")
      .where("id", id)
      .del()

    return event
  }

  static async updateEvent(id, params) { 
    const event = await knex("events")
      .where("id", id)
      .update(params)
      .returning("*");

      return event
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
      }).returning("*");

    return event[0];
  }
}