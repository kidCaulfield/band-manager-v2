const knex = require("../db/client");
const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require("../models/users");

const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';

module.exports = {
  async create(req, res, next) {
    let { userName, email, password, passwordDigest } = req.body.users;
    console.log('passwordDigest: ', passwordDigest);

    const schema = Joi.object().keys({
      users: {
        userName: Joi.string().max(30),
        email: Joi.string().email(),
        password: Joi.string().valid(passwordDigest),
        passwordDigest: Joi.string()
      }
    })

    Joi.validate(req.body, schema, (err, result) => {
      if (err) {
        console.log('err: ', err);
        res.status(422).json({
              status: 'error',
              message: 'Invalid request data',
              data: res.body
        });
      }
    })
    
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds)
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