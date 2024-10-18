const express = require("express");

const { getCity } = require("../controllers/cityController");

const cityRouter = express.Router();

cityRouter.get("/cities", getCity);

module.exports = cityRouter;
