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
      if (user && (await bcrypt.compare(password, user.passwordDigest))) {
        req.session.userId = user.id;

      res.status(200).json(req.session.userId);
      }
    } catch (err) {
      throw err
    }
  },
  async destroy(req, res) {
    console.log("jibbi");
    console.log('req.session: ', req.session);
    req.session.destroy(function(){
      res.clearCookie('connect.sid', { path: '/' });
    });

    res.status(200);
  }
};