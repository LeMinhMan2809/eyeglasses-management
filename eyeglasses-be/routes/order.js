const express = require("express");

const {
  getOrders,
  getOrderByUserID,
  addOrder,
  deleteOrder,
  getOrderByOrderId,
} = require("../controllers/orderController");
const {
  getOrderDetailByOrderID,
} = require("../controllers/orderDetailController");

const orderRouter = express.Router();

orderRouter.get("/", getOrders);
orderRouter.get("/order/:orderID", getOrderByOrderId);
orderRouter.get("/user/:userID", getOrderByUserID);
// orderRouter.get("/:userID", getAddressByUserID);
orderRouter.post("/add", addOrder);
orderRouter.delete("/:id", deleteOrder);

module.exports = orderRouter;
