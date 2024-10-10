const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    name: {type: String, required: true},
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {type: Number, required: true},
})    

const cartModel = mongoose.model("Cart", cartModel);
module.exports = cartModel;

