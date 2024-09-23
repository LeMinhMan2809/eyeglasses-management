const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const { getCategories, addCategories, getCategoriesID, deleteCategories, updateCategories } = require("../controllers/categoriesController");
const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoriesID);
categoryRouter.post("/add", addCategories);
categoryRouter.put("/:id", updateCategories);
categoryRouter.delete("/:id", deleteCategories);



module.exports = categoryRouter;