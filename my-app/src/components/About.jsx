import React from 'react';
import Header from "./Reusable/Header";
import SideNav from "./Reusable/SideNav";

const AboutPage = () => {
  return (
    <div className="container-fluid ">
    <Header />
    <div className="row">
        <div className="sidenav col-sm-auto sticky-top">
            <SideNav />
        </div>
        <div className="col-sm pe-2 ps-5 pt-3 min-vh-100 ">
    <div className="container mt-5">
      <h1 className='blue-main-text'>About This Application</h1>
      <div className="mt-3">
      
        <p className='light-grey-ubuntu'>
          This application provides a platform to search, add, edit, and delete products. It features real-time search functionalities and price filtering, making use of RESTful APIs to interact with a MongoDB database.
        </p>
      </div>
      <div className="mt-3">
        <h3 className='blue-main-text'>Technologies Involved</h3>
        <ul>
            <div className='list-group list-group-flush light-grey-ubuntu'>
                <li className="list-group-item ">React.js for the front-end user interface.</li>
            <li className="list-group-item">Node.js and Express for the server-side logic.</li>
            <li className="list-group-item">MongoDB with Mongoose for the database management.</li>
            <li className="list-group-item">Bootstrap and custom CSS for styling.</li>

            </div>
   
        </ul>
      </div>
      <div className="mt-3">
        <h3 className='blue-main-text'>Weaknesses of the Application</h3>
        <ul>
            <div className='list-group list-group-flush light-grey-ubuntu'>
            <li className="list-group-item">Limited error handling in frontend which might not cover all failing cases.</li>
          <li className="list-group-item">Dependence on network status for fetching and updating data can lead to delays or errors in product management.</li>
          <li className="list-group-item">Security features are not extensively implemented, which may pose risks in a production environment.</li>
            </div>

        </ul>
      </div>
      <div className="mt-3">
        <h3 className='blue-main-text'>Alternatives for Implementation</h3>
        <ul>
            <div className=' list-group list-group-flush light-grey-ubuntu'>
            <li className="list-group-item" >Using GraphQL instead of REST API for more efficient data fetching and management.</li>
          <li className="list-group-item">Implementing server-side rendering (SSR) with Next.js for improved SEO and performance.</li>
          <li className="list-group-item">Using a SQL database like PostgreSQL for complex queries and better transaction management.</li>
            </div>

        </ul>
      </div>
    </div> 
        </div>
    
        </div>
    </div>
        

  );
};

export default AboutPage;
