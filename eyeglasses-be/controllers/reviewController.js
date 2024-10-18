const { model } = require("mongoose");
const reviewModel = require("../models/review");

const getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find();
    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const getReviewByProductID = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({ product: req.params.id })
      .populate("user product");
    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const addReview = async (req, res) => {
  try {
    const review = new reviewModel({
      title: req.body.title,
      content: req.body.content,
      rating: req.body.rating,
      user: req.body.user,
      product: req.body.product,
    });
    await review.save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

module.exports = { getReviews, addReview, getReviewByProductID };
