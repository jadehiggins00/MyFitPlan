const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: String,
    name: String
});

const productSchema = new mongoose.Schema({
    sku: Number,
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

module.exports = Product;
