const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/expressError.js")
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js")
const {isLoggedIn} = require("../middleware.js")

const reviewController = require("../controller/reviews.js")

router.post("/createReview" , isLoggedIn, wrapAsync(reviewController.createReview))
router.delete("/:reviewId" , wrapAsync(reviewController.destroyReview ));

module.exports = router;
