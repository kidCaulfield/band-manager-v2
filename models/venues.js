const knex = require("../db/client");

module.exports = class Venue {
  constructor({id, name, address, phone_number, geo, created_at, updated_at} = {}) {
    this.id = id,
    this.name =  name,
    this.address =  address,
    this.phone_number =  phone_number,
    this.geo = geo,
    this.created_at = created_at,
    this.updated_at = updated_at
  };

  static async find(params) {
    const venue = await knex("venues")
      .select()
      .where(params); // note: .where can take and object

      return venue;
  };

  static async findByName(name) {
    const venue = await knex("venues")
      .select()
      .where("name", name);
      
    return venue;
  };

  static async findById(id) {
    const venue = await knex("venues")
      .where("id", id)
      .first()

    return venue;
  }

  static async allVenues() {
    const venues = await knex("venues").orderBy("id", "asc");

    return venues;
  }

  static async authorize(id, uid) {
    let key;
    const venue = await knex("venues")
      .where("id", id)
      .first()
    venue.user_id == uid ? key = true : key = false;
    return key;
  }

  static async deleteVenue(id) {
    const venue = await knex("venues")
      .where("id", id)
      .del()

    return venue
  }

  static async updateVenue(id, params) {
    const venue = await knex("venues")
      .where("id", id)
      .update(params)
      .returning("*");

      return venue
  }

  async save() {
    const {name, address, geo} = this;
    const newVenue = await knex("venues")
      .insert({
        name,
        address,
        geo
      }).returning("id");
    
    return newVenue
  }
};