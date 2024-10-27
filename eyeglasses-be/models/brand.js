const mongoose = require("mongoose");
const { models } = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const brandModel = models?.Brand || mongoose.model("Brand", brandSchema);
module.exports = brandModel;
