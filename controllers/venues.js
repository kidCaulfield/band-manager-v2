
const express = require("express");
const router = express.Router();
const knex = require("../db/client");

module.exports = {
  async index(req, res) {

    // Whenever you need to use the method `then` with a callback to get a value
    // from asynchronous code, you can instead use keyword `await` to for that value
    // only inside functions or methods that are prefixed with the keyword `async`

    try {
    const venues = await knex("venues").orderBy("id", "desc");
    console.log(`venues request`); // find out how to log the IP of the computer requesting
    res.status(200).json({ venues });
    } catch (error) {
      console.log(error)
    }

  },
  create: [
    async (req, res) => {
      const { name, address, phone_number, geo } = req.body;
     
      const venue = await knex("venues")
        .insert({
          name,
          address,
          phone_number,
          geo
        })
        .returning("id");

      res.status(200).json(venue);
    }
  ],
}