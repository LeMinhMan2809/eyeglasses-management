const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const Product = require("../models/product");
const { getProducts, addProducts, getProductID, updateProducts, deleteProducts } = require("../controllers/productController");

const productRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})
const upload = multer({ storage: storage }); 


productRouter.get("/", getProducts)
productRouter.get("/:id", getProductID);
productRouter.post("/add",upload.single("image"), addProducts)
productRouter.put("/:id", updateProducts);
productRouter.delete("/:id", deleteProducts);


module.exports = productRouter;