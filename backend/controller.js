const mongoose = require('../db/mongoose');
const fs = require('fs');
//to use object id when passing the id from a function in model class and to its type from string to objectId

const express = require('express');

const Product = require('./models/products');

const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();

//parse the incoming json requests
app.use(bodyParser.json());
app.use(cors());

exports.importProducts = async (req, res) => {
  fs.readFile('products.json', 'utf8', async (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return res.status(500).send("Failed to read file");
      }
      try {
          const products = JSON.parse(data);
          await Product.insertMany(products);
          res.send('Products imported successfully');
      } catch (err) {
          console.error('Error importing products:', err);
          res.status(500).send("Failed to import products");
      }
  });
};

// Route to handle importing products
app.post('/import-products', exports.importProducts);

app.post('/products', (req, res) => {
  const productData = req.body;


  Product.findOne({ sku: productData.sku })
      .then(existingProduct => {
          if (existingProduct) {

              return res.status(409).json({ message: "A product with the same SKU already exists." });
          }

          const product = new Product(productData);
          return product.save();
      })
      .then(savedProduct => {

          res.status(201).json({ message: "Product added successfully", data: savedProduct });
      })
      .catch(error => {

          console.error("Failed to save the product:", error);
          res.status(500).json({ error: "Internal server error", details: error.message });
      });
});


// get all products
app.get('/products', (req, res) => {
  Product.find({})
      .then(products => {
          res.status(200).json(products);
      })
      .catch(error => {
          console.error("Failed to retrieve products:", error);
          res.status(500).json({ error: "Internal server error", details: error.message });
      });
});
 
// update product by id
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  Product.findByIdAndUpdate(id, req.body, { new: true })
      .then(updatedProduct => {
          res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
      })
      .catch(error => {
          console.error("Failed to update the product:", error);
          res.status(500).json({ error: "Internal server error", details: error.message });
      });
});


app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
      .then(result => {
          if (result) {
              res.status(200).json({ message: "Product deleted successfully" });
          } else {
              res.status(404).json({ error: "Product not found" });
          }
      })
      .catch(error => {
          console.error("Failed to delete the product:", error);
          res.status(500).json({ error: "Internal server error", details: error.message });
      });
});

// search for products by name or category
app.get('/products/search', (req, res) => {
  const { manufacturer } = req.query;
  Product.find({
      manufacturer: new RegExp(manufacturer, 'i'), // Case-insensitive search
  })
  .then(products => {
      if (products.length > 0) {
          res.status(200).json(products);
      } else {
          res.status(404).json({ message: "No products found" });
      }
  })
  .catch(error => {
      console.error("Failed to search products:", error);
      res.status(500).json({ error: "Internal server error", details: error.message });
  });
});



// filter products by price range
app.get('/products/filter', (req, res) => {
  const { minPrice, maxPrice } = req.query;
  Product.find({
      price: { $gte: minPrice, $lte: maxPrice }
  })
  .then(products => {
      res.status(200).json(products);
  })
  .catch(error => {
      console.error("Failed to filter products:", error);
      res.status(500).json({ error: "Internal server error", details: error.message });
  });
});


app.listen(3003, (req, res) =>
  console.log('Example app listening on port 3003!'),

);


