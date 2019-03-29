const knex = require("../db/client");
const bcrypt = require('bcrypt');

module.exports = {
  async create(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    const { email, password } = req.body;

    // try {
      const user = await knex("users")
        .where("email", email)
        .first();

      console.log('user: ', user);
      if (user && (await bcrypt.compare(password, user.passwordDigest))) {
        req.session.userId = user.id;
        req.session.name = user.userName;
        console.log('req.session.name: ', req.session.name)

      res.status(200).json(req.session.userId);
    }
  },
  destroy(req, res) {
    req.session.userId = undefined;

    res.status(200);
  }
};