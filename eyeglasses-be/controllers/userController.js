const pLimit = require("p-limit");
const productModel = require("../models/user");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const userModel = require("../models/user");

require("dotenv").config();

const jwt = require("jsonwebtoken");
const brypt = require("bcrypt");
const validator = require("validator");
// { expiresIn: "3d" }
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const getUserID = async (req, res) => {
  try {
    const users = await userModel.findById(req.params.id).populate();
    if (!users) return res.status(404).json({ message: "User not found" });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).populate();
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "Người dùng không tồn tại" });

    const isMatch = await brypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Sai mật khẩu" });

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const addUser = async (req, res) => {
  console.log(req.body.email);
  const existingUser = await userModel.findOne({ email: req.body.email });
  if (existingUser) {
    return res.json({ message: "Người dùng đã tồn tại" });
  }
  const { name, email, password, phone } = req.body;
  try {
    if (!validator.isEmail(email))
      return res.json({ message: "Email invalid" });
    if (password.length < 6) return res.json({ message: "Password too short" });

    const salt = await brypt.genSalt(10);
    const hashPassword = await brypt.hash(password, salt);
    const image_file_name = `${req.file.filename}`;

    const user = new userModel({
      name: name,
      email: email,
      password: hashPassword,
      phone: phone,
      image: image_file_name,
    });
    await user.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, message: "User updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  getUserID,
  addUser,
  userLogin,
  getOneUser,
  updateUser,
};
