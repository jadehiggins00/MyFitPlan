import React, { useState, useEffect } from 'react';
import Header from "./Reusable/Header";
import SideNav from "./Reusable/SideNav";
import Edit from '../images/edit3.svg';
import Delete from '../images/delete.svg';

import '../css/App.css';

function Home() {
    const [products, setProducts] = useState([]); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [editableProduct, setEditableProduct] = useState({
        name: '',
        description: '',
        model: '',
        price: ''
    });

    useEffect(() => {
        fetch('http://localhost:3003/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setCurrentIndex(0); 
                setEditableProduct(data[0] || {});
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []); 

    const handleEdit = () => {
        setEditMode(true);
        setEditableProduct(products[currentIndex]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        fetch(`http://localhost:3003/products/${products[currentIndex]._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editableProduct)
        })
            .then(response => response.json())
            .then(updatedProduct => {
                alert('Product updated successfully');
                const updatedProducts = products.map((p, index) =>
                    index === currentIndex ? { ...p, ...editableProduct } : p
                );
                setProducts(updatedProducts);
                setEditMode(false);
            })
            .catch(error => console.error('Error updating product:', error));
    };

    const handleDelete = () => {
        const product = products[currentIndex];
        fetch(`http://localhost:3003/products/${product._id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(() => {
                alert('Product deleted successfully');
                setProducts(products.filter((_, index) => index !== currentIndex));
                setCurrentIndex(0);
            })
            .catch(error => console.error('Error deleting product:', error));
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % products.length;
        setCurrentIndex(nextIndex);
        setEditableProduct(products[nextIndex]);
        setEditMode(false);
    };

    const handlePrevious = () => {
        const prevIndex = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
        setEditableProduct(products[prevIndex]);
        setEditMode(false);
    };

    return (
        <div className="container-fluid page-background">
            <Header />
            <div className="row">
                <div className="sidenav col-sm-auto sticky-top">
                    <SideNav />
                </div>
                <div className="col-sm pe-2 ps-5 pt-3 min-vh-100 ">
                    {products.length > 0 ? (
                       
                     
                        <div className='col-8 container-margin'>
                               <div className="row section-habitat card">
                      
                      <div className="card-header ">
                          <h2 className="blue-main-text pt-1">Welcome to Siopadóireacht</h2>
                      </div>
                      <div className="card-body">
                          <div className="row">
                              <div className='col-6'>
                                  {editMode ? (
                                      <>
                                          <input
                                              type="text"
                                              name="name"
                                              value={editableProduct.name}
                                              onChange={handleChange}
                                              className='form-control mb-2'
                                          />
                                          <textarea
                                              name="description"
                                              value={editableProduct.description}
                                              onChange={handleChange}
                                              className='form-control mb-2'
                                          />
                                          <input
                                              type="text"
                                              name="model"
                                              value={editableProduct.model}
                                              onChange={handleChange}
                                              className='form-control mb-2'
                                          />
                                          <input
                                              type="text"
                                              name="price"
                                              value={editableProduct.price}
                                              onChange={handleChange}
                                              className='form-control mb-2'
                                          />
                                      </>
                                  ) : (
                                      <>
                                          <h3 className='grey-bold-ubuntu pt-3'>{editableProduct.name}</h3>
                                          <p className='light-grey-ubuntu pt-3'>Description: {editableProduct.description}</p>
                                          <p className='light-grey-ubuntu'>Model: {editableProduct.model}</p>
                                          <h3 className='grey-bold-ubuntu pt-3'>Price: {editableProduct.price}</h3>
                                      
                                      </>
                                  )}
                              </div>
                              <div className='col-6'>
                                  <img src={products[currentIndex].image} alt="Product" />
                              </div>
                          </div>
                          <div className='row'>
                              <div className='col-6'>
                                  {editMode && (
                                      <>
                                          <button className='btn btn-danger' onClick={() => setEditMode(false)}>Cancel</button>
                                          <button className='btn btn-success' onClick={handleUpdate}>Update</button>
                                      </>
                                  )}
                              </div>
                              </div>
                    
                          <div className='row'>
                          

                              <div className='col-7'>
                              <button className='btn btn-danger' onClick={handleDelete}><span className='white-bold-ubuntu '>Delete</span>  <img src={Delete} alt="" className="edit-img  "/></button>
                              <button className='btn btn-secondary ms-2' onClick={handleEdit}> <span className='white-bold-ubuntu '>Edit</span>  <img src={Edit} alt="" className="edit-img ms-2 " /></button>
                            
                              </div>
                              <div className='col-3'>
                                  <div className='row'>
                                      <div className='col-6'>
                                          <button className='btn btn-primary px-4' onClick={handlePrevious}>
                                            <span className='white-bold-ubuntu'>Previous</span> </button>
                                      </div>
                                      <div className='col-6'>
                                          <button className='btn btn-primary px-4' onClick={handleNext}>
                                          <span className='white-bold-ubuntu'>Next</span> </button>
                                         
                                      </div>
                                  </div>
                              </div>
                         
                      
                          </div>
                      </div>
                  </div>
                        </div>
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
