const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        console.log("DB Connected")
    })
    .catch((err) => {
        console.log(err)});


app.listen(process.env.PORT, () => {
    console.log(`Server is running http://localhost:${process.env.PORT}`);
});