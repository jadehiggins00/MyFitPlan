# How to Start Application

## Backend 
Open up a terminal in the root directory and run the command
npm run dev

## Frontend
go to the my-app directory and run the command
npm start


## Application Testing Guide

### Testing REST API Endpoints

#### Search Products

- **Component**: `Search.jsx`
- **Usage**: Enter a product name in the search field and click the "Search" button. This component makes a GET request to `/products/search-by-name` and displays the results.

### Add Products

- **Component**: `Home.jsx`
- **Usage**: Click the "Add New Product" button, fill out the product details in the form that appears, and submit. This component makes a POST request to `/products` to add a new product.

### Update and Delete Products

- **Component**: `Home.jsx`
- **Usage**: Each product has "Edit" and "Delete" buttons next to it. Use "Edit" to modify product details and "Update" to send the changes to the server via a PUT request to `/products/:id`. Use "Delete" to remove the product with a DELETE request to `/products/:id`.

### Filter Products by Price

- **Component**: `FilterProducts.jsx`
- **Usage**: Enter minimum and maximum prices and click the "Search" button. This component sends a GET request to `/products/filter` to retrieve products within the specified price range.

