const mongoose = require("mongoose");
const { Schema, models, model } = require("mongoose");

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
});

const districtModel =
  models?.District || mongoose.model("District", districtSchema);
module.exports = districtModel;
