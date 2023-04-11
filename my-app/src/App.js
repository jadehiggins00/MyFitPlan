import logo from './logo.svg';
import './css/App.css';
import './css/General.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


import LeftArrow from './images/LeftArrow.png';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/activities')
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  return (
       <div>
    <header>
      <div className="Header">
        <button className="btn btn-home bg-none">
          <a href="Home.html">
            <img src="images/Home.png" className="img-fluid" alt="" />
          </a>
        </button>
        <p className="HeaderText p-5">MyFitPlan</p>
        <button className="btn btn-profile bg-none">
          <a href="Profile.html">
            <img src={logo} className="img-fluid p-4" alt="" />
          </a>
        </button>
      </div>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-12 offset-md-0.2">
            <hr id="line" />
          </div>
        </div>
      </div>
    </header>

    <section className="Date" id="">
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center text-center">
            <div className="d-flex align-items-center mr-auto">
              <button className="btn btn-primary btn-custom ml-5" data-bs-target="#demo" id="leftbutton">
                <img src="images/LeftArrow.png" alt="Button 1" className="mr-2" />
              </button>
            </div>
            <div className="flex-fill h2-custom">
              <h2 className="h2" id="day"></h2>
            </div>
            <div className="d-flex align-items-center ml-auto">
              <button className="btn btn-primary btn-custom mr-5" data-bs-target="#demo" id="rightbutton">
                <img src="images/RightArrow.png" alt="Button 2" className="mr-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
    <div>
      <h1>this is a list </h1>
    <ul>
      {activities.map(activity => (
        <li key={activity._id}>{activity.DayOfWeek} - {activity.Exercise}</li>
      ))}
    </ul>
  </div>
    </section>
  

 
  </div>

    

);
 


}

export default App;
