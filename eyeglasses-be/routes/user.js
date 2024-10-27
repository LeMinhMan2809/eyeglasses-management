const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
// const image = require("../uploads")
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  getUsers,
  getUserID,
  addUser,
  userLogin,
  getOneUser,
  updateUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/user",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(500).json({ message: "Failed to authenticate token" });

    req.userId = decoded.id;
    next();
  });
};

userRouter.get("/", getUsers);
userRouter.get("/profile", verifyToken, getOneUser);
userRouter.get("/:id", getUserID);
userRouter.post("/register", upload.single("image"), addUser);
userRouter.post("/login", userLogin);
userRouter.put("/:id", upload.single("image"), updateUser);
userRouter.post("/pw/forgot-password", forgotPassword);
userRouter.post("/pw/reset-password/:id/:token", resetPassword);

module.exports = userRouter;
