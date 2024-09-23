const pLimit = require("p-limit");
const productModel = require("../models/product");
const categoryModel = require("../models/category");
const cloudinary = require("../utils/cloudinary");

require("dotenv").config();


const getProducts = async (req, res) => {
    try {
        const products = await productModel.find().populate("category");
        res.json(products);
    } catch (error) {
        console.log(error);
        res.json({sucess: false});
    }
}

const getProductID = async (req, res) => {
    try {
        const products = await productModel.findById(req.params.id).populate();
        if (!products) return res.status(404).json({message: "Product not found"});
        res.json(products);
    } catch (error) {
        console.log(error);
        res.json({sucess: false});
    }
}

const addProducts = async (req, res) => {
    const categories = await categoryModel.findById(req.body.category);
    if (!categories) 
        return res.status(404).json({message: "Category not found"});

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

    let image_file_name = `${req.body.filename}`
    const product = new productModel({
        name: req.body.name,
        images: imgURL,
        description: req.body.description,
        price: req.body.price,
        quantityStock: req.body.quantityStock,
        category: req.body.category
    })
    try {
        await product.save();
        res.json({message: "Product added", sucess: true});
    } catch (error) {
        console.log(error);
        res.json({sucess: false});
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
        res.json({sucess: true, message: "Product updated"});
    } catch (error) {
        console.log(error);
    }
}

const deleteProducts = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({message: "Product not found"});
        res.json({sucess: true, message: "Product deleted"});
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getProducts, getProductID, addProducts, deleteProducts, updateProducts }