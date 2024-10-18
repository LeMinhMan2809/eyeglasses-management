const express = require("express");

const {
  getDistrict,
  getDistrictByCityID,
} = require("../controllers/districtController");

const districtRouter = express.Router();

districtRouter.get("/", getDistrict);
districtRouter.get("/:cityId", getDistrictByCityID);

module.exports = districtRouter;
