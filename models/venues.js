const knex = require("../db/client");


/* Explore this login later */

// const distinctUserIds = objs =>
//   Array.from(
//     new Set(
//       objs.map(c => parseInt(c.userId, 10)).filter(id => !Number.isNaN(id))
//     )
//   );

// module.exports = class Venue {
//   static async forWithUsers(postId) {
//     const venues = await knex("venues")
//       .where("postId", postId)
//       .orderBy("createdAt", "desc")
//       .returning("*");

//     const userIds = distinctUserIds(venues);
//     const users = await knex("users").whereIn("id", userIds);

//     venues.forEach(
//       c => (c.user = users.find(u => u.id === parseInt(c.userId)))
//     );

//     return venues;
//   }
// };