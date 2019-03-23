exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
    t.increments("id");
    t.string("userName");
    t.string("email");
    t.string("passwordDigest"); // this stores salt + hashing of (salt + password)
    t.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};