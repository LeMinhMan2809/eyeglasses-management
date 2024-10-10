const categoryModel = require ("../models/category");



const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.json({sucess: false});
    }
}

const getCategoriesID = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);
        if (!category) return res.status(404).json({message: "Category not found"});
        res.json(category);
    } catch (error) {
        console.log(error);
        res.json({success: false});
    }
}

const addCategories = async (req, res) => {
    const existingCategory = await categoryModel.findOne({name: req.body.name});
    if (existingCategory) {
        return res.json({message: "Category already exists"});
    }

    const category = new categoryModel({
            name: req.body.name,
            description: req.body.description
        });
    try {
        await category.save();
        res.json({success: true});
    } catch (error) {
        console.log(error);
        res.json({success: false});
    }
}

const updateCategories = async (req, res) => {
    try {
        const category = await categoryModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description
            },
            {new: true}
        );
        if (!category) return res.status(404).json({message: "Category not found"});
        res.json({success: true, message: "Category updated"});
    } catch (error) {
        console.log(error);
    }
}

const deleteCategories = async (req, res) => {
    try {
        const category = await categoryModel.findByIdAndDelete(req.params.id);
        if (!category) 
            return res.status(404).json({message: "Category not found"});
        res.json({success: true, message: "Category deleted"});
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getCategories, getCategoriesID, addCategories, deleteCategories, updateCategories };