const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const reviewsController = require('../controllers/reviewsController');

router
    .post("/reviews", auth.authenticateToken, reviewsController.createReview)
    .get("/reviews", auth.authenticateToken, reviewsController.getReviews)
    .get("/reviews/:id", auth.authenticateToken, reviewsController.getReviewById)
    .put("reviews/:id", auth.authenticateToken, reviewsController.updateReview)
    .delete("/reviews/:id", auth.authenticateToken, reviewsController.deleteReview)

module.exports = router;