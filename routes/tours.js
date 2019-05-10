const express = require("express");
const router = express.Router();
const toursController = require("../controllers/tours")

/////////////// A U T H E N T I C A T I O N /////////////////

function authenticateUser(req, res, next) {
  if (!req.session.userId) {
    res.status(401).json({error: "You must be signed in"});
  }
  next();
}

router.get('/tours', authenticateUser, toursController.index);
router.get('/confirmedtours', toursController.indexConfirmedTours);
router.get('/tours/:id', authenticateUser, toursController.show);
router.post('/tours', authenticateUser, toursController.create);
router.delete('/tours/:id', authenticateUser, toursController.destroy);
router.patch('/tour/:id', authenticateUser, toursController.update);


module.exports = router;