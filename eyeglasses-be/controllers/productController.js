const pLimit = require("p-limit");
const productModel = require("../models/product");
const categoryModel = require("../models/category");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

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
    const existingProduct = await productModel.findOne({name: req.body.name});
    if (existingProduct) {
        return res.json({message: "Sản phẩm đã tồn tại"});
    }
    console.log('File received:', req.file); // Log the file object
    console.log('Body received:', req.body); // Log the form data
    if (!req.file) {
            return res.status(400).json({ message: "No image file uploaded" });
        }

    // const limit = pLimit(2);

    // const imagesUpload = req.file.images.map((image) => {
    //     return limit(async () => {
    //         const result = await cloudinary.uploader.upload(image);
    //         return result;
    //     })
    // })

    // const uploadStatus = await Promise.all(imagesUpload)
    // const imgURL = uploadStatus.map((image) => {
    //     return image.secure_url
    // })

    // if (!uploadStatus) {
    //     return res.status(500).json({status: false});
    // }

    //const image_file_names = req.files ? req.files.map(file => file.filename) : [];
    //const image_filenames = req.files.map(file => file.filename);
    const image_file_name = `${req.file.filename}`;

    console.log(image_file_name);
    const product = new productModel({  
        name: req.body.name,
        // images: imgURL,
        images:[image_file_name],
        description: req.body.description,
        price: req.body.price,
        quantityStock: req.body.quantityStock,
        category: req.body.category
    })
    try {
        await product.save();
        res.json({success: true});
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

module.exports = { getProducts, getProductID, addProducts, deleteProducts, updateProducts }