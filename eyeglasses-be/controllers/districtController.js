const districtModel = require("../models/district");
const { Schema, models, model } = require("mongoose");

const getDistrict = async (req, res) => {
  try {
    const district = await districtModel.find();
    res.json(district);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const getDistrictByCityID = async (req, res) => {
  try {
    const district = await districtModel.find({
      city: req.params.cityId,
    });
    res.json(district);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

module.exports = { getDistrict, getDistrictByCityID };
