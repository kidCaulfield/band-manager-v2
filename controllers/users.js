const knex = require("../db/client");
const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require("../models/users");

const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';

module.exports = {
  async create(req, res, next) {
    let { userName, email, password, passwordDigest } = req.body.users;

    //not effective
    if (!password == passwordDigest) {
      return "PASSWORDS DO NOT MATCH"
    }

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      console.log('hashedPassword: ', hashedPassword);


      const user = await knex("users")
        .insert({
            userName,
            email,
            passwordDigest: hashedPassword
        })
        .returning("*");

        res.status(200).json(user);
    } catch (error) {
      next(error);
    }


  }
};
//         bcrypt.compareSync(password, hash);
//         console.log('bcrypt.compareSync(myPlaintextPassword, hash);: ', bcrypt.compareSync(password, hash));
//         bcrypt.compareSync(someOtherPlaintextPassword, hash);
//         console.log(' bcrypt.compareSync(someOtherPlaintextPassword, hash);: ',  bcrypt.compareSync(someOtherPlaintextPassword, hash));      