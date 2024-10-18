const mongoose = require("mongoose");
const { models } = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      //required: true,
    },
  },
  { timestamps: true }
);

const reviewModel = models?.Review || mongoose.model("Review", reviewSchema);
module.exports = reviewModel;
