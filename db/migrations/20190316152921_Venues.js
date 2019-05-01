exports.up = function(knex, Promise) {
  return knex.schema.createTable('venues', t => {
    t.increments('id').primary();
    t.string('name');
    t.string('address');
    t.string('phone_number').unique();
    t.json('geo');
    t.string("place_id").defaultTo(null);
    t.string("international_phone_number").defaultTo(null);
    t.string("vicinity")defaultTo(null);
    t.string("formatted_address").defaultTo(null);
    t.string("website").defaultTo(null);
    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('venues');  
};