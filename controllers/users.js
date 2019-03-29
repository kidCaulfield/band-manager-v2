const knex = require("../db/client");
const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require("../models/users");


const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';

module.exports = {
  async create(req, res, next) {
    let { userName, email, password, passwordDigest } = req.body.users;

    const schema = Joi.object().keys({
      users: {
        userName: Joi.string().max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().valid(passwordDigest).required(),
        passwordDigest: Joi.string().required()
      }
    })

    Joi.validate(req.body, schema, (err, result) => {
      if (err) {
        console.log('err: ', err);
        res.status(422).json({
              status: 'error',
              message: `${err.details[0].message}`,
              data: res.body
        });
      }
    })
    
    try {
      const rows = await knex("users")
        .select()
        .where('email', email);
      let checkedData;
      if (rows.length===0) {
      checkedData = await knex("users")
              .insert({
              userName,
              email,
              passwordDigest: await bcrypt.hash(password, saltRounds)
            }).returning('*')
        } else {
            throw "duplicate user found"
        }
      res.status(200).json(checkedData);
    } catch (error) {
      next(error);
    }
  }
};