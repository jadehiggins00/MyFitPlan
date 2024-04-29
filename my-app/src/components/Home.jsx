import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Header from "./Reusable/Header";
import SideNav from "./Reusable/SideNav";

import '../css/App.css';

function Home() {
    const [products, setProducts] = useState([]); 
    const [currentIndex, setCurrentIndex] = useState(0); 

  
    useEffect(() => {
        fetch('http://localhost:3003/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setCurrentIndex(0); 
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []); 


    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length); // Loop back to the first after the last product
    };


    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? products.length - 1 : prevIndex - 1); // Loop back to the last if at the first product
    };

    return (

        <div className="container-fluid page-background">
        <Header />
        <div className="row">
          <div className="sidenav col-sm-auto sticky-top">
            <SideNav/>
          </div>
          <div className="col-sm pe-2 ps-5 pt-3 min-vh-100">
            <div className="row"></div>
            {products.length > 0 ? (
                <div>
                    <div className="product-display">
                    
                  
                  
                    </div>
                    <button className='btn btn-primary' onClick={handlePrevious}>&lt; Previous</button>
                    <button onClick={handleNext}>Next &gt;</button>
                </div>
            ) : (
                <p>No products found</p>
            )}
            <div className="row pt-4">
              <div className="col-8 container-margin px-3">
                <div className="row section-habitat card">
                  <div className="card-header">
                    <h2 className="blue-main-text pt-1">Welcome to Siopadóireacht
</h2>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* <h5 className='light-grey-ubuntu pt-3'>Start Shopping Now!</h5> */}
                    

                      <div className='col-6'>
                      <h3 className='grey-bold-ubuntu pt-3'>{products[currentIndex].name}</h3> 
                      <p className='light-grey-ubuntu pt-3'>{products[currentIndex].description}</p> 
                      </div>
                      <div className='col-6'>                  <img src={products[currentIndex].image} alt="Product" /> </div>
                    </div>
                  </div>
                </div>
                <div className='row pt-5'>
                  <h4 className="grey-ubuntu">Empowering Conservation Through Technology</h4>
                  <h5 className="light-grey-ubuntu pt-3"><span className='blue-main-text'>Anois is Arís</span> harnesses the power of AI and machine learning to pioneer the future of wildlife conservation in Ireland. By analyzing patterns and predicting the potential havens for our cherished endangered species, we're not just envisioning a safer future; we're actively creating it.</h5>
                  <h5 className="light-grey-ubuntu">Our focus narrows on three key species at risk, employing cutting-edge algorithms to map out their potential safe zones based on both current and future environmental scenarios.</h5>
                  <div className="row pt-3 justify-content-start">
                    <div className="col-4 d-flex justify-content-start">
                 
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-5 px-4 d-flex justify-content-center align-items-center container-margin">
                <div className='row'>
                  <div className='col-12'>

                  </div>
                </div>
              </div> */}
            </div>
          </div>
         
        </div>
        
        {/* Footer Section */}
   
      </div>


  
      

    );
}

export default Home;
