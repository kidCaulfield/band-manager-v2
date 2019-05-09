const knex = require('../db/client')

module.exports = class Location {
  constructor ({city, geo, country, iso2, region, capital, population, population_proper} = {}) {
    this.city = city,
    this.geo = geo,
    this.country = country,
    this.iso2 = iso2,
    this.region = region,
    this.capital = capital,
    this.population = population,
    this. population_proper= population_proper
  }

  static async find(params) {
    const location = await knex("locations")
      .select()
      .where(params);

      return location;
  };

  static async findCountries() {
    const countries = await knex("locations")
      .distinct('country');

      return countries;
  };

  static async findRegions(params) {
    const regions = await knex("locations")
      .distinct('region')
      .where(params);

      return regions;
  };

  static async findCities(params) {
    const cities = await knex("locations")
      .select('*')
      .where(params);

      return cities;
  };

  static async all() {
    const locations = await knex("locations").orderBy("id", "asc");

    return locations;
  }

  static async updateLocation(id, params) {
    const location = await knex("locations")
      .where("id", id)
      .update(params)
      .returning("*");

    return location[0]
  }

  async save() {
    const {city, country, iso2, region, capital, population, population_proper} = this;
    const location = await knex("locations")
      .insert({city, country, iso2, region, capital, population, population_proper})
      .returning("id");
    
    return location[0];
  }
}