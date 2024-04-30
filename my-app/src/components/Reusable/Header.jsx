import React from 'react';
import Logo from '../../images/logo.svg';
import '../../css/App.css';

const HeaderComponent = () => {
    return (
        <div className="container-fluid nav-header ">
          <img src={Logo} alt="Logo" className="site-logo mt-4 ms-4 pt-2
            " />
            
        
        </div>

    );
};
export default HeaderComponent;