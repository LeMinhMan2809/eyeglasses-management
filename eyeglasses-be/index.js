const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

//Routes//
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const userRoute = require("./routes/user");

const connectDB = require("./config/db");

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
app.use("/api/category", categoryRoute);
app.use("/api/user", userRoute);

//DB Connection
connectDB();


app.listen(process.env.PORT, () => {
    console.log(`Server is running http://localhost:${process.env.PORT}`);
});