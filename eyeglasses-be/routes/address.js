const express = require("express");

const {
  getAddress,
  addAddress,
  getAddressByUserID,
  deleteAddress,
} = require("../controllers/addressController");
const addressRouter = express.Router();

addressRouter.get("/", getAddress);
addressRouter.get("/:userID", getAddressByUserID);
addressRouter.post("/add", addAddress);
// addressRouter.put("/:id", updateCategories);
addressRouter.delete("/:id", deleteAddress);

module.exports = addressRouter;
