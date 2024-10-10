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
    return jwt.sign({ id }, process.env.JWT_SECRET);
}
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.json({success: false});
    }
}

const getUserID = async (req, res) => {
    try {
        const users = await userModel.findById(req.params.id).populate();
        if (!users) return res.status(404).json({message: "User not found"});
        res.json(users);
    } catch (error) {
        console.log(error);
        res.json({success: false});
    }
}

const userLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) 
            return res.json({success:false, message: "Người dùng không tồn tại"});

        const isMatch = await brypt.compare(password, user.password);
        if (!isMatch)
            return res.json({success:false, message: "Sai mật khẩu"});

        const token = createToken(user._id);
        res.json({success: true, token});

    } catch (error) {
        console.log(error);
        res.json({success: false});
    }
}

const addUser = async (req, res) => {
    const existingUser = await userModel.findOne({email: req.body.email});
    if (existingUser) {
        return res.json({message: "Người dùng đã tồn tại"});
    }
    const {name, email, password, phone} = req.body;
    try {
        if (!validator.isEmail(email)) 
            return res.json({message: "Email invalid"});
        if (password.length < 6)
            return res.json({message: "Password too short"});

        const salt = await brypt.genSalt(10);
        const hashPassword = await brypt.hash(password, salt);

        const user = new userModel({  
        name: name,
        email: email,
        password: hashPassword,
        phone: phone,
    })
        await user.save();
        const token = createToken(user._id);
        res.json({success: true, token});
    } catch (error) {
        console.log(error);
        res.json({success: false});
    }
}

const updateProducts = async (req, res) => {
    const limit = pLimit(2);

    const imagesUpload = req.body.images.map((image) => {
        return limit(async () => {
            const result = await cloudinary.uploader.upload(image);
            return result;
        })
    })

    const uploadStatus = await Promise.all(imagesUpload)
    const imgURL = uploadStatus.map((image) => {
        return image.secure_url
    })

    if (!uploadStatus) {
        return res.status(500).json({status: false});
    }

    try {
        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                images: imgURL,
                description: req.body.description,
                price: req.body.price,
                quantityStock: req.body.quantityStock,
                category: req.body.category
            },
            {new: true}
        );
        if (!product) return res.status(404).json({message: "Product not found"});
        res.json({success: true, message: "Product updated"});
    } catch (error) {
        console.log(error);
    }
}

const deleteProducts = async (req, res) => {
    const productImage = await productModel.findById(req.params.id);
    fs.unlink(`./uploads/${productImage.images[0]}`, (err) => {     
        if (err) {
            console.log(err);
        }
    });
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) 
            return res.status(404).json({message: "Product not found"});
        res.json({success: true, message: "Product deleted"});
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUsers, getUserID, addUser, userLogin}