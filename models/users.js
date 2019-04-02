const bcrypt = require("bcrypt");
const saltRounds = 10
const knex = require("../db/client");

module.exports = class User {
  constructor({ id, userName, email, password, passwordDigest, createdAt } = {}) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.passwordDigest = passwordDigest;
    this.createdAt = createdAt;
  }

  static async findByEmail(email) {
    const user = await knex("users")
      .select()
      .where('email', email);
      return user
  }
    
  async save() {
    const { email, userName, password } = this;
    const newUser = await knex("users")
            .insert({
            userName,
            email,
            passwordDigest: await bcrypt.hash(password, saltRounds)
            }).returning('*');
    return newUser
  }
}