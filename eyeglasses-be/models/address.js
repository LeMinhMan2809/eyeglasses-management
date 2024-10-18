const mongoose = require("mongoose");
const { Schema, models, model } = require("mongoose");

const addressSchema = new mongoose.Schema({
  username: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phoneNumber: { type: Number, required: true },
  addressFull: { type: String, required: true },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
  ward: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ward",
    required: true,
  },
});

const addressModel =
  models?.Address || mongoose.model("Address", addressSchema);
module.exports = addressModel;
