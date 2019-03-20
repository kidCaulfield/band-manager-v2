exports.up = function(knex, Promise) {
  return knex.schema.createTable('venues', t => {
    t.increments('id').primary();
    t.string('name');
    t.string('address');
    t.string('phone_number').unique();
    t.json('geo');
    t.timestamps(true, true)
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('venues');  
};