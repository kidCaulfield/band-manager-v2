const bcrypt = require("bcrypt");
const saltRounds = 10
const knex = require("../db/client");

module.exports = class User {
  constructor({ id, username, email, password, password_digest, created_at } = {}) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.password_digest = password_digest;
    this.created_at = created_at;
  };

  static async findByEmail(email) {
    const user = await knex("users")
      .select()
      .where('email', email);
      return user
  };

  static async findById(id) {
    const user = await knex("users")
      .select("id", "username", "email") // choose's which columns you want returned
      .where('id', id)
      .first()

      return user
  };
    
  static async authorize(id, uid) {
    let key;
    const user = await knex("users")
      .where("id", id)
      .first()
    user.id == uid ? key = true : key = false;
    return key;
  };

  static async deleteUser(id) {
    const user = await knex("users")
      .where("id", id)
      .del()

    return user;
  };

  static async updateUser(id, request) {
    const {username, email, password_digest} = request;
    const user = await knex("users")
      .where("id", id)
      .update({
        username,
        email
      }).returning("*")

    return user
  };

  async save() {
    const { email, username, password } = this;
    const newUser = await knex("users")
    .insert({
      username,
      email,
      password_digest: await bcrypt.hash(password, saltRounds)
    }).returning('*');
    
    return newUser
  };
};