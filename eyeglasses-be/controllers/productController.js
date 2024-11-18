const pLimit = require("p-limit");
const productModel = require("../models/product");
const categoryModel = require("../models/category");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

require("dotenv").config();

const getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("category")
      .populate("brand");
    res.json(products);
  } catch (error) {
    console.log(error);
    res.json({ sucess: false });
  }
};

const getProductsPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 items per page

    // Calculate skip (offset)
    const skip = (page - 1) * pageSize;

    const products = await productModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .populate("brand");

    const totalProducts = await productModel.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / pageSize);

    // Send response
    res.json({
      success: true,
      products,
      totalProducts,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false });
  }
};

const getProductsByName = async (req, res) => {
  // res.json(req.query.keyword);
  try {
    const products = await productModel
      .find({ name: { $regex: req.query.keyword, $options: "i" } })
      .populate("category");
    res.json(products);
  } catch (error) {
    console.log(error);
    res.json({ sucess: false });
  }
};

const getProductID = async (req, res) => {
  try {
    const products = await productModel
      .findById(req.params.id)
      .populate("brand category");
    if (!products)
      return res.status(404).json({ message: "Product not found" });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.json({ sucess: false });
  }
};

const addProducts = async (req, res) => {
  const existingProduct = await productModel.findOne({ name: req.body.name });
  if (existingProduct) {
    return res.json({ message: "Sản phẩm đã tồn tại" });
  }
  console.log("File received:", req.file); // Log the file object
  console.log("Body received:", req.body); // Log the form data
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
    images: [image_file_name],
    description: req.body.description,
    price: req.body.price,
    brand: req.body.brand,
    quantityStock: req.body.quantityStock,
    category: req.body.category,
  });
  try {
    await product.save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const updateProducts = async (req, res) => {
  const limit = pLimit(2);

  const imagesUpload = req.body.images.map((image) => {
    return limit(async () => {
      const result = await cloudinary.uploader.upload(image);
      return result;
    });
  });

  const uploadStatus = await Promise.all(imagesUpload);
  const imgURL = uploadStatus.map((image) => {
    return image.secure_url;
  });

  if (!uploadStatus) {
    return res.status(500).json({ status: false });
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
        category: req.body.category,
      },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ success: true, message: "Product updated" });
  } catch (error) {
    console.log(error);
  }
};

const deleteProducts = async (req, res) => {
  const productImage = await productModel.findById(req.params.id);
  fs.unlink(`./uploads/${productImage.images[0]}`, (err) => {
    if (err) {
      console.log(err);
    }
  });
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log(error);
  }
};

const getProductBasedOnCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    // console.log(categoryId);
    const products = await productModel
      .find({ category: categoryId })
      .populate("category")
      .populate("brand");

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category" });
    }

    // Return the found products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

module.exports = {
  getProducts,
  getProductID,
  getProductsPagination,
  getProductsByName,
  addProducts,
  deleteProducts,
  updateProducts,
  getProductBasedOnCategory,
};
