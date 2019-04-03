
exports.up = function(knex, Promise) {
  return knex.schema.createTable("tours", t => {
    t.increments("id").primary();
    t.string("title");
    t.string("band");
    t.boolean("confirmed").defaultTo(false);
    t.integer("user_id").references("users.id");
    t.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable("tours");
};
