const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    images: [{type: String, required: true}],
    description: {type: String, required: true},
    price: {type: String, required: true},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    quantityStock: {type: Number, required: true},
})    

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel

