const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
// const image = require("../uploads")

const Product = require("../models/product");
const {
  getProducts,
  addProducts,
  getProductID,
  updateProducts,
  deleteProducts,
  getProductBasedOnCategory,
} = require("../controllers/productController");

const productRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
    //return cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductID);
productRouter.get("/category/:categoryId", getProductBasedOnCategory);
// productRouter.get("/category", getProductBasedOnCategory);
productRouter.post("/add", upload.single("images"), addProducts);
productRouter.put("/:id", updateProducts);
productRouter.delete("/:id", deleteProducts);

module.exports = productRouter;
