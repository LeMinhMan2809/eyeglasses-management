const mongoose = require("mongoose");
const { Schema, models, model } = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const cityModel = models?.City || mongoose.model("City", citySchema);
module.exports = cityModel;
