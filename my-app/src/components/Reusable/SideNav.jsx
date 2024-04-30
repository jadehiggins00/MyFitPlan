import React, { useState } from 'react';
import '../../css/App.css';
import Home from '../../images/home.svg';
import About from '../../images/about.svg';
import { Link } from 'react-router-dom';

const SideNavComponent = () => {
  const [dropdownOpen, setDropdownOpen] = useState({
    curlew: false,
    toad: false,
    wallBrown: false, 
    home: false,
  });

  const toggleDropdown = (name) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleSidebarHover = (isOpen) => {
    if (!isOpen) {
      setDropdownOpen({
        curlew: false,
        toad: false,
        wallBrown: false,
        home: false,
      });
    }
  };



  return (
    <div className="container-fluid ms-1 " onMouseEnter={() => handleSidebarHover(true)}
         onMouseLeave={() => handleSidebarHover(false)}>
        <div className="row">
            <div className="d-flex flex-sm-column flex-row flex-nowrap bg- align-items-center sticky-top">
                <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-1 align-items-center">
                    <li className='pt-5'> 
                        <div className="nav-item d-flex justify-content-start">
                            <div className="button-container" style={{ position: 'relative' }}>
                                <div className='btn-group'>
                                <Link to="/" className='text-decoration-none'>
                                  <button  className=" btn tab-button d-flex align-items-center justify-content-center  "  id="fossil-tab" >
                                        <img src={Home} alt="Species tab" className="leaf-icon " />
                                        <span className=" text-container nav-text me-4" id="nav-text-fossil" >Home</span>
                                    </button>
                                  </Link>
                               
                              
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className='pt-5'>
                        <div className="nav-item d-flex justify-content-start">
                            <div className="button-container" style={{ position: 'relative' }} >
                                <div className='btn-group'>
                                <Link to="/about" className='text-decoration-none'>
                                  <button  className=" btn tab-button d-flex align-items-center justify-content-center  "  id="fossil-tab" >
                                        <img src={About} alt="Species tab" className="leaf-icon " />
                                        <span className=" text-container nav-text me-4" id="nav-text-fossil" >About</span>
                                    </button>
                                  </Link>
                            
                                </div>
                            </div>
                        </div>
                    </li>
              

                </ul>
            </div>
        </div>
    </div>
  );
};

export default SideNavComponent;
