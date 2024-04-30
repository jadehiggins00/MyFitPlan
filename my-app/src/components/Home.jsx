import React, { useState, useEffect } from 'react';
import ProductFilter from   './Reusable/FilterProducts';
import Header from "./Reusable/Header";
import SideNav from "./Reusable/SideNav";
import Edit from '../images/edit3.svg';
import Delete from '../images/delete.svg';

import '../css/App.css';

function Home() {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [addMode, setAddMode] = useState(false);



    const [editableProduct, setEditableProduct] = useState({
        name: '',
        description: '',
        model: '',
        price: ''
    });

    const [newProduct, setNewProduct] = useState({
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
        console.log("Editing:", products[currentIndex]); 
    };
    

    const handleChange = (e, productType) => {
        const { name, value } = e.target;
        if (productType === 'editable') {
            setEditableProduct(prev => {
                console.log(`Updating field ${name} to ${value}`); // Debugging statement
                return { ...prev, [name]: value };
            });
        } else {
            setNewProduct(prev => ({ ...prev, [name]: value }));
        }
    };
    
    

    const handleUpdate = () => {
        console.log("Sending Update:", editableProduct); // Check the payload before sending
        fetch(`http://localhost:3003/products/${products[currentIndex]._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editableProduct)
        })
        .then(response => response.json())
        .then(updatedProduct => {
            console.log("Update Successful:", updatedProduct); // Verify server response
            const updatedProducts = products.map((p, index) =>
                index === currentIndex ? { ...p, ...editableProduct } : p
            );
            setProducts(updatedProducts);
            setEditMode(false);
        })
        .catch(error => {
            console.error("Error updating product:", error);
            alert('Error updating product');
        });
    };
    

    const handleAddNewProduct = () => {
        fetch('http://localhost:3003/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct)
        })
            .then(response => response.json())
            .then(addedProduct => {
                alert('Product added successfully');
                setProducts([...products, addedProduct]);
                setNewProduct({ name: '', description: '', model: '', price: '' });
                setAddMode(false);  // Exit add mode after adding a product
            })
            .catch(error => console.error('Error adding new product:', error));
    };

    const handleDelete = () => {
        const product = products[currentIndex];
        fetch(`http://localhost:3003/products/${product._id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(() => {
                alert('Product deleted successfully');
                const updatedProducts = products.filter((_, index) => index !== currentIndex);
                setProducts(updatedProducts);
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

    const toggleAddMode = () => {
        setAddMode(!addMode);
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
                                <div className="card fixed-height-card">
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
                                                            onChange={(e) => handleChange(e, 'editable')}
                                                            className='form-control mb-2'
                                                        />
                                                        <textarea
                                                            name="description"
                                                            value={editableProduct.description}
                                                            onChange={(e) => handleChange(e, 'editable')}
                                                            className='form-control mb-2'
                                                        />
                                                        <input
                                                            type="text"
                                                            name="model"
                                                            value={editableProduct.model}
                                                            onChange={(e) => handleChange(e, 'editable')}
                                                            className='form-control mb-2'
                                                        />
                                                        <input
                                                            type="text"
                                                            name="price"
                                                            value={editableProduct.price}
                                                            onChange={(e) => handleChange(e, 'editable')}
                                                            className='form-control mb-2'
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <h4 className='grey-bold-ubuntu pt-3'>{editableProduct.name}</h4>
                                                        <p className='light-grey-ubuntu pt-3'>Description: {editableProduct.description}</p>
                                                        <p className='light-grey-ubuntu'>Model: {editableProduct.model}</p>
                                                        <h3 className='grey-bold-ubuntu pt-3'>Price: ${editableProduct.price}</h3>
                                                    </>
                                                )}
                                            </div>
                                            <div className='col-6 d-flex justify-content-center align-items-center card-image-container'>
                                                <img src={products[currentIndex].image} alt="Product" className='card-image' />
                                            </div>

                                        </div>
                                        <div className='row pt-3'>
                                            <div className='col-7'>
                                                {editMode ? (
                                                    <>
                                                        <button className='btn btn-outline-secondary' onClick={() => setEditMode(false)}>Cancel</button>
                                                        <button className='btn btn-success ms-3' onClick={handleUpdate}>Update</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className='btn btn-danger' onClick={handleDelete}>
                                                            <span className='white-bold-ubuntu '>Delete</span>
                                                            <img src={Delete} alt="" className="edit-img"/>
                                                        </button>
                                                        <button className='btn btn-secondary ms-2' onClick={handleEdit}>
                                                            <span className='white-bold-ubuntu '>Edit</span>
                                                            <img src={Edit} alt="" className="edit-img ms-2"/>
                                                        </button>
                                                        <button className='btn btn-success ms-2' onClick={toggleAddMode}>Add New Product</button>
                                                    </>
                                                )}
                                            </div>
                                            <div className='col-3'>
                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <button className='btn btn-primary px-4' onClick={handlePrevious}>
                                                            <span className='white-bold-ubuntu'>Previous</span>
                                                        </button>
                                                    </div>
                                                    <div className='col-6'>
                                                        <button className='btn btn-primary px-4' onClick={handleNext}>
                                                            <span className='white-bold-ubuntu'>Next</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row pt-4'>
                                        {addMode && (
                                            <div className='col-12 mb-3'>
                                                <div className="card">
                                                    <div className="card-header">Add New Product</div>
                                                    <div className="card-body">

                                                        <input
                                                            type="text"
                                                            placeholder="Sku"
                                                            name="sku"
                                                            value={newProduct.sku}
                                                            onChange={(e) => handleChange(e, 'new')}
                                                            className='form-control mb-2'
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Name"
                                                            name="name"
                                                            value={newProduct.name}
                                                            onChange={(e) => handleChange(e, 'new')}
                                                            className='form-control mb-2'
                                                        />
                                                        <textarea
                                                            placeholder="Description"
                                                            name="description"
                                                            value={newProduct.description}
                                                            onChange={(e) => handleChange(e, 'new')}
                                                            className='form-control mb-2'
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Model"
                                                            name="model"
                                                            value={newProduct.model}
                                                            onChange={(e) => handleChange(e, 'new')}
                                                            className='form-control mb-2'
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Price"
                                                            name="price"
                                                            value={newProduct.price}
                                                            onChange={(e) => handleChange(e, 'new')}
                                                            className='form-control mb-2'
                                                        />
                                                        <button onClick={handleAddNewProduct} className="btn btn-success">Add Product</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                         
                        
                    ) : (
                        <p>No products found</p>
                    )}

                    <div className='col-8 container-margin pt-3'>
                        <ProductFilter/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home
