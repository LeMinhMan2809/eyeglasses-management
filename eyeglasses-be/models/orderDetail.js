const mongoose = require("mongoose");
const { models } = require("mongoose");

const orderDetailSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    products: { type: Object, required: true },
  },
  { timestamps: true }
);

const orderDetailModel =
  models?.OrderDetail || mongoose.model("OrderDetail", orderDetailSchema);
module.exports = orderDetailModel;
