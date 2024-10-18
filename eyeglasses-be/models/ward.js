const mongoose = require("mongoose");
const { Schema, models, model } = require("mongoose");

const wardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
});

const wardModel = models?.Ward || mongoose.model("Ward", wardSchema);
module.exports = wardModel;
