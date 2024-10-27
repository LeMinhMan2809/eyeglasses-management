const express = require("express");

const {
  getOrderDetail,
  addOrderDetail,
  getOrderDetailByOrderID,
  deleteOrderDetail,
} = require("../controllers/orderDetailController");

const orderDetailRouter = express.Router();

orderDetailRouter.get("/", getOrderDetail);
orderDetailRouter.get("/:orderID", getOrderDetailByOrderID);
// orderDetailRouter.get("/:userID", getAddressByUserID);
orderDetailRouter.post("/add", addOrderDetail);
orderDetailRouter.delete("/:id", deleteOrderDetail);

module.exports = orderDetailRouter;
