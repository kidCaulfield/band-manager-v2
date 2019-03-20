
exports.up = function(knex, Promise) {
  return knex.schema.createTable('venues', t => {
    t.increments('id').primary();
    t.string('name');
    t.string('address');
    t.string('phone_number').unique();
    t.json('geo');
    t.timestamps('updatedAt');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('venues');  
};

// create_table "venues", force: :cascade do |t|
//     t.string "name"
//     t.string "address"
//     t.json "geo"
//     t.datetime "created_at", null: false
//     t.datetime "updated_at", null: false
//     t.bigint "user_id"
//     t.string "full_address"
//     t.index ["user_id"], name: "index_venues_on_user_id"
//   end

// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('users', table => {
//     table.increments('id');
//     table.string('first_name');
//     table.string('last_name');
//     table.string('email');
//     table.foreign('user_id').references('tours.user_id_in_tours')
//     table.foreign('user_id').references('events.user_id_in_events')
//     table.timestamps('updatedAt');
//   });
// };
