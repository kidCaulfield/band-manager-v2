const knex = require("../db/client");
const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require("../models/users");
const saltRounds = 10;

const validateUser = (requestBody, response) => {
let { userName, email, password, passwordDigest } = requestBody.users
const schema = Joi.object().keys({
      users: {
        userName: Joi.string().max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().valid(passwordDigest).required(),
        passwordDigest: Joi.string().required()
      }
    })

  Joi.validate(requestBody, schema, (err, result) => {
    if (err) {
      console.log('err: ', err);
      response.status(422).json({
            status: 'error',
            message: `${err.details[0].message}`,
            data: response.body
      });
    }
  })
}

module.exports = {
  async create(req, res, next) {
    let { userName, email, password, passwordDigest } = req.body.users;
    validateUser(req.body, res);

    try {
    const verify = await User.findByEmail(email)
    let user;
    if (verify.length === 0) {
      user = new User({userName, email, password, passwordDigest})
      user.save()
    } else {
      throw "duplicate user found"
    }
    res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
};