
exports.up = function(knex, Promise) {
  return knex.schema.createTable("events", t => {
    t.increments("id").primary();
    t.string("title");
    t.string("address");
    t.string("contact");
    t.text("details").defaultTo(null);
    t.datetime("date_time", 6);
    t.boolean("confirmed").defaultTo(false);
    t.boolean("cancelled").defaultTo(false);
    t.integer("tour_id").references("tours.id");
    t.integer("venue_id").references("venues.id");
    t.integer("user_id").references("users.id");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("events")
};