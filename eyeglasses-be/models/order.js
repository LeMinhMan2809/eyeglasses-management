const mongoose = require("mongoose");
const { models } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total: { type: Number, required: true },
    address: { type: String, required: true },
    status: {
      type: Number,
      required: true,
      min: 1,
      max: 3,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    payment: { type: String, required: true },
    note: { type: String },
  },
  { timestamps: true }
);

const orderModel = models?.Order || mongoose.model("Order", orderSchema);
module.exports = orderModel;
