


const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utils/expressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controller/reviews.js");

router.route("/")
  .post(isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

router.route("/:reviewId")
  .delete(isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;
