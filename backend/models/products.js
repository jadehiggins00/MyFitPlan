const mongoose = require('mongoose');

// activities table
const productSchema =  new mongoose.Schema({
    userName: String,   
    goal_text: String,
    goal_date: String,
    goal_status: String,
});


//creating the model
const Products = mongoose.model('products', productSchema);

// Exporting the model directly
module.exports = Products;