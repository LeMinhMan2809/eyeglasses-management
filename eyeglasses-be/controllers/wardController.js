const wardModel = require("../models/ward");
const { Schema, models, model } = require("mongoose");

const getWard = async (req, res) => {
  try {
    const ward = await wardModel.find();
    res.json(ward);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const getWardByDistrictID = async (req, res) => {
  try {
    const ward = await wardModel.find({
      district: req.params.districtId,
    });
    res.json(ward);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

module.exports = { getWard, getWardByDistrictID };
