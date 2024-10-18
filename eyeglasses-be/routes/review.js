const express = require("express");

const {
  getReviews,
  addReview,
  getReviewByProductID,
} = require("../controllers/reviewController");

const reviewRouter = express.Router();

reviewRouter.get("/", getReviews);
reviewRouter.get("/:id", getReviewByProductID);
reviewRouter.post("/add", addReview);

module.exports = reviewRouter;
