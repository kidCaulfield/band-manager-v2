
exports.up = function(knex, Promise) {
  return knex.schema.createTable('locations', t => {
    t.increments('id').primary();
    t.string('city');
    t.json("geo").defaultTo(null);
    t.string("country").defaultTo(null);
    t.string("iso2").defaultTo(null);
    t.string("region").defaultTo(null);
    t.string("capital").defaultTo(null);
    t.string("population").defaultTo(null);
    t.string("population_proper").defaultTo(null);
    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('locations');  
};
