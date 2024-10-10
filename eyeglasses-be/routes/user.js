const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
// const image = require("../uploads")

const { getUsers, getUserID, addUser, userLogin} = require("../controllers/userController");

const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
})
const upload = multer({ storage: storage }); 


userRouter.get("/", getUsers)
userRouter.get("/:id", getUserID);
userRouter.post("/register",addUser);
userRouter.post("/login",userLogin);



module.exports = userRouter;