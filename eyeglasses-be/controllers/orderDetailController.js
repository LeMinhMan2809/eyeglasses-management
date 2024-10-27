const orderDetailModel = require("../models/orderDetail");

const getOrderDetail = async (req, res) => {
  try {
    const orderDetail = await orderDetailModel.find();
    res.json(orderDetail);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const getOrderDetailByOrderID = async (req, res) => {
  try {
    const { orderID } = req.params;
    const orderDetails = await orderDetailModel.find({ order: orderID });
    res.json(orderDetails);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const addOrderDetail = async (req, res) => {
  const orderDetail = new orderDetailModel({
    order: req.body.order,
    products: req.body.products,
  });
  try {
    await orderDetail.save();
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
};

const deleteOrderDetail = async (req, res) => {
  const { id } = req.params;
  try {
    await orderModel.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

module.exports = {
  getOrderDetail,
  getOrderDetailByOrderID,
  addOrderDetail,
  deleteOrderDetail,
};
