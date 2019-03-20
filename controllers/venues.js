//const { body, validationResult } = require("express-validator/check");
// bring in validations later

const express = require("express");
const router = express.Router();
const knex = require("../db/client");


module.exports = {
  async index(req, res) {
    // knex("posts")
    //   .orderBy("createdAt", "desc")
    //   .then(posts => {
    //     res.render("posts/index", { posts });
    //   });

    // Whenever you need to use the method `then` with a callback to get a value
    // from asynchronous code, you can instead use keyword `await` to for that value
    // only inside functions or methods that are prefixed with the keyword `async`

    const venues = await knex("venues").orderBy("id", "desc");
    res.status(200).json({ venues });
  }
}