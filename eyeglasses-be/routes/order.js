const express = require("express");

const { getOrders, addOrder } = require("../controllers/orderController");
const { get } = require("mongoose");
const orderRouter = express.Router();

orderRouter.get("/", getOrders);
// orderRouter.get("/:userID", getAddressByUserID);
orderRouter.post("/add", addOrder);

module.exports = orderRouter;
