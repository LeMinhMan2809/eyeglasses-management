const orderModel = require("../models/order");

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const addOrder = async (req, res) => {
  const order = new orderModel({
    user: req.body.user,
    total: req.body.total,
    address: req.body.address,
    status: req.body.status,
    payment: req.body.payment,
    note: req.body.note,
  });
  try {
    await order.save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

module.exports = { getOrders, addOrder };
