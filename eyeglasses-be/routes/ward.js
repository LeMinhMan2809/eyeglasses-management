const express = require("express");

const {
  getWard,
  getWardByDistrictID,
} = require("../controllers/wardController");

const wardRouter = express.Router();

wardRouter.get("/", getWard);
wardRouter.get("/:districtId", getWardByDistrictID);

module.exports = wardRouter;
