const express = require("express");

const {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

const brandRouter = express.Router();

brandRouter.get("/", getBrands);
brandRouter.post("/add", addBrand);
brandRouter.put("/:id", updateBrand);
brandRouter.delete("/:id", deleteBrand);

module.exports = brandRouter;
