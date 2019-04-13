const knex = require("../db/client");
const bcrypt = require('bcrypt');

module.exports = {
  async create(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    const { email, password } = req.body;

    try {
      const user = await knex("users")
        .where("email", email)
        .first();
      if (user && (await bcrypt.compare(password, user.password_digest))) {
        req.session.userId = user.id;
        req.currentUser = user.username;

      res.status(200).json({id: req.session.userId, user: req.currentUser});
      }
    } catch (err) {
      throw err
    }
  },
  async destroy(req, res) {
    req.session.destroy(function(){
      res.clearCookie('COOOKIE!!!!', { path: '/' }).status(200).json({});
      req.currentUser = undefined;
    });
  }
};