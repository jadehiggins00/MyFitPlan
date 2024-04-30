const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: String,
    name: String
});

const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        unique: true, 
        required: true 
    },
    name: String,
    type: String,
    price: Number,
    upc: String,
    category: [categorySchema],
    shipping: Number,
    description: String,
    manufacturer: String,
    model: String,
    url: String,
    image: String
});

const Product = mongoose.model('products', productSchema);
productSchema.index({ price: 1 }); // Adds an index on the price field


module.exports = Product;
