const { body, validationResult } = require("express-validator/check");
const express = require("express");
const router = express.Router();
const knex = require("../db/client");

const validateVenue = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Title must be present")
    .custom(async name => {
      if (
        await knex("posts")
          .whereRaw(`"name" ILIKE ?`, name)
          .first()
      ) {
        throw new Error("Name must be unique");
      }
    })
]

module.exports = {
  async index(req, res) {

    // Whenever you need to use the method `then` with a callback to get a value
    // from asynchronous code, you can instead use keyword `await` to for that value
    // only inside functions or methods that are prefixed with the keyword `async`

    const venues = await knex("venues").orderBy("id", "desc");
    console.log("venues request"); // find out how to log the IP of the computer requesting
    res.status(200).json({ venues });
  },
}