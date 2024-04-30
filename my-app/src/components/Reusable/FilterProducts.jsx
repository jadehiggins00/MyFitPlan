import React, { useState } from 'react';

function ProductFilter() {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3003/products/filter?minPrice=${minPrice}&maxPrice=${maxPrice}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
            setError('');
        } catch (err) {
            setError(err.message);
            setProducts([]);
        }
    };

    return (
        <div>
            <div className='card'>
                <div className=' card-header'>
                  <h3 className='blue-main-text'>Filter Products by Price</h3>
                </div>

                <div className='card-body'>
                    <div className='row'>
                        <div className='col-6'>
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            className='form-control mb-2'
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            className='form-control mb-2'
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      <button className='btn btn-primary' onClick={handleSearch}>Search</button>
                        </div>
                        <div className='col-6'></div>

                    </div>
                    <div className='row pt-3'>
                    {error && <p>Error: {error}</p>}
            <ul>
                {products.map(product => (
                    <div className='list-group' key={product._id}>
                        <li className="list-group-item" >
                            <div className='row'>
                            <div className='col-6'>
                            <h4 className='grey-bold-ubuntu'>{product.name}</h4>
                         
                            <p className='light-grey-ubuntu'><span className='grey-bold-ubuntu'>Description: <br></br></span>{product.description}</p>
                            <h3 className='light-grey-ubuntu'>${product.price}</h3>
                            </div>
                            <div className='col-6'>
                            <img src={product.image} alt="Product" className='card-image' />
                                </div>
                            </div>
                         

                           
                        </li>
                    </div>
              
                ))}
            </ul>
                    </div>
                </div>

            </div>

       
        
          
      
        </div>
    );
}

export default ProductFilter;
