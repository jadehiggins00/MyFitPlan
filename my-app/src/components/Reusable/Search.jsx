import React, { useState } from 'react';

function ProductSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        fetch(`http://localhost:3003/products/search-by-name?name=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data);
            })
            .catch(error => console.error('Error searching products:', error));
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <div className='card'>
                <div className='card-header'>
                <h3 className='blue-main-text'>Product Search</h3>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-12'>
                        <input
                            type="text"
                            placeholder="Search by product name"
                            value={searchTerm}
                            className='form-control mb-2'
                            onChange={handleChange}
                        />
                        <button className='btn btn-primary' onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                    <div className='row pt-3'>
                    {searchResults.length > 0 ? (
                    
                    <ul>
                        {searchResults.map(product => (
                            <div className='list-group' key={product._id}>
                                <li  className="list-group-item" >
                                <h4  className='grey-bold-ubuntu'>{product.name}</h4>
                                <p className='light-grey-ubuntu'><span className='grey-bold-ubuntu'>Description: <br></br></span>{product.description}</p>
                                <h3 className='light-grey-ubuntu'>${product.price}</h3>
                                <img src={product.image} alt={product.name} style={{ width: '100px' }} />
                            </li>
                            </div>
                      
                        ))}
                    </ul>
                ) : (
                    <p></p>
                )}
                    </div>
                </div>
            </div>
          

            <div>
        
            </div>
        </div>
    );
}

export default ProductSearch;
