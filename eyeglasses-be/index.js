const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

//Routes//
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const userRoute = require("./routes/user");

const cityRoute = require("./routes/city");
const districtRoute = require("./routes/district");
const wardRoute = require("./routes/ward");

const addressRoute = require("./routes/address");
// const cartRoute = require("./routes/cart");

const connectDB = require("./config/db");
const orderRouter = require("./routes/order");
const statusRouter = require("./routes/status");

const reviewRouter = require("./routes/review");
// const vnpayRouter = require("./routes/orderOnline");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/product", productRoute);
app.use("/images", express.static("uploads"));
app.use("/images", express.static("uploads/user"));
app.use("/api/category", categoryRoute);
app.use("/api/user", userRoute);
// app.use("/api/cart", cartRoute);
app.use("/api/address", addressRoute);

app.use("/api/city", cityRoute);
app.use("/api/district", districtRoute);
app.use("/api/ward", wardRoute);

app.use("/api/order", orderRouter);
app.use("/api/status", statusRouter);

app.use("/api/review", reviewRouter);

//DB Connection
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running http://localhost:${process.env.PORT}`);
});
