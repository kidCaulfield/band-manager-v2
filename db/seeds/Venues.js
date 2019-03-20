
// https://github.com/marak/Faker.js/
const faker = require("faker");

// To run your seed files, do:
// knex seed:run

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("venues")
    .del() // DELETE FROM "venues";
    .then(() => {
      const venues = Array.from({ length: 100 }).map(() => {
        return {
          name: faker.company.companyName(),
          address: faker.address.streetAddress(),
          phone_number: faker.phone.phoneNumber(),
          geo: {
            lat: faker.address.latitude(),
            lng: faker.address.longitude()
          }
        };
      });
      // Inserts seed entries
      // Inside of a callback passed to the then function, always
      // return the knex query that you create. EVERYTIME!
      return knex("venues").insert(venues);
    });
};