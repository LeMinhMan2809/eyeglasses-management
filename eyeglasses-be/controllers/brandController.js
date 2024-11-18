const brandModel = require("../models/brand");

const getBrands = async (req, res) => {
  try {
    const brands = await brandModel.find();
    res.json(brands);
  } catch (error) {
    console.log(error);
    res.json({ sucess: false });
  }
};

const getBrandByID = async (req, res) => {
  try {
    const brand = await brandModel.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json(brand);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const addBrand = async (req, res) => {
  const existingBrand = await brandModel.findOne({ name: req.body.name });
  if (existingBrand) {
    return res.json({ message: "Brand already exists" });
  }

  const brand = new brandModel({
    name: req.body.name,
    description: req.body.description,
  });
  try {
    await brand.save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const updateBrand = async (req, res) => {
  try {
    const brand = await brandModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
      },
      { new: true }
    );
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json({ success: true, message: "Brand updated" });
  } catch (error) {
    console.log(error);
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brand = await brandModel.findByIdAndDelete(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json({ success: true, message: "Brand deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getBrands,
  getBrandByID,
  addBrand,
  updateBrand,
  deleteBrand,
};
