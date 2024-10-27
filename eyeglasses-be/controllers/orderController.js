const orderModel = require("../models/order");

const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 items per page

    // Calculate skip (offset)
    const skip = (page - 1) * pageSize;

    const orders = await orderModel.find().skip(skip).limit(pageSize);

    const totalOrders = await orderModel.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalOrders / pageSize);

    // Send response
    res.json({
      success: true,
      orders,
      totalOrders,
      totalPages,
      currentPage: page,
    });
    // res.json(orders);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const getOrderByUserID = async (req, res) => {
  try {
    const { userID } = req.params;
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 items per page

    // Calculate skip (offset)
    const skip = (page - 1) * pageSize;

    const orders = await orderModel
      .find({ user: userID })
      .skip(skip)
      .limit(pageSize);

    const totalOrders = await orderModel.countDocuments({ user: userID });

    // Calculate total pages
    const totalPages = Math.ceil(totalOrders / pageSize);

    // Send response
    res.json({
      success: true,
      orders,
      totalOrders,
      totalPages,
      currentPage: page,
    });
    // res.json(orders);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const getOrderByOrderId = async (req, res) => {
  try {
    const { orderID } = req.params;

    const orders = await orderModel.find({ _id: orderID });

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
    if (req.body.payment === "Thanh toán online") {
      const paymentUrl = await createPayment(req);
      return res.json({ success: true, paymentUrl });
    } else {
      res.json({ success: true, order });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
};

const config = {
  vnp_TmnCode: "25R87S5U", // Mã website của bạn tại VNPay
  vnp_HashSecret: "U3VAERFHUZUSBE7TM3RPFZA61JU1H1W9", // Chuỗi bí mật để tạo mã hash
  vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html", // Đường dẫn thanh toán của VNPay
  vnp_ReturnUrl: "http://localhost:5172/payment", // URL trả về sau khi thanh toán
};

const moment = require("moment");

const createPayment = (req) => {
  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = config.vnp_TmnCode;
  var secretKey = config.vnp_HashSecret;
  var vnpUrl = config.vnp_Url;
  var returnUrl = config.vnp_ReturnUrl;

  var createDate = moment().format("YYYYMMDDHHmmss");
  var orderId = moment().format("HHmmss");
  var amount = req.body.total;

  var orderInfo = req.body.orderDescription;
  var orderType = req.body.orderType;
  var locale = req.body.language;
  if (locale === undefined || locale === "") {
    locale = "vn";
  }
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;

  vnp_Params = sortObject(vnp_Params);

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  // console.log("vnpUrl", vnpUrl);
  return vnpUrl;
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]);
  }
  return sorted;
}

const deleteOrder = async (req, res) => {
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
  getOrders,
  getOrderByUserID,
  getOrderByOrderId,
  addOrder,
  deleteOrder,
};
