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

  async save() {
    const {city, country, iso2, region, capital, population, population_proper} = this;
    const location = await knex("locations")
      .insert({city, country, iso2, region, capital, population, population_proper})
      .returning("id");
    console.log('location: ', location);
    
    return location;
  }
}