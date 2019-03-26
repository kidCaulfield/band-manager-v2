const knex = require("../db/client");
const bcrypt = require('bcrypt');

module.exports = {

  async create(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await knex("users")
        .where("email", email)
        .first();

      if (user && (await bcrypt.compare(password, user.passwordDigest))) {
        req.session.userId = user.id;
        

        req.flash("success", `Welcome back, ${user.userName}!`);
        res.status(200);
      } else {
        req.flash("danger", "Invalid Email or Password");
        res.status(400);
      }
    } catch (error) {
      next(error);
    }
  },
  destroy(req, res) {
    req.session.userId = undefined;

    res.status(200);
  }
 };