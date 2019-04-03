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

  static async findByName(name) {
    const venue = await knex("venues")
      .select()
      .where("name", name);
      
    return venue;
  };

  async save() {
    const {name, address, phone_number, geo} = this;
    const newVenue = await knex("venues")
      .insert({
        name,
        address,
        phone_number,
        geo
      }).returning("id");
    
    return newVenue
  }
};