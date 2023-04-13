import logo from './logo.svg';
import './css/App.css';
import './css/General.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


import LeftArrow from './images/LeftArrow.png';

import 'bootstrap/dist/css/bootstrap.min.css';





function App() {

  // grabbing the activities object
  const [ activities, setActivities] = useState([]);
  //using a state var to set the currentDay to monday (0)
  const [currentDayIndex, setCurrentDayIndex] = useState(0);


    // Create a function to get the date based on the current day index
    const getCurrentDate = (dayIndex) => {
      const today = new Date();
      // this line of code controls the date aligning with the day
      today.setDate(today.getDate()  + (dayIndex - today.getDay() + 1));
      //format of day 
      return `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${(today.getFullYear()).toString().padStart(2, "0")}`;
    };

    const [currentDate, setCurrentDate] = useState(getCurrentDate(0));

  // axios function to get the list of activities from the db
  useEffect(() => {
    axios.get('http://localhost:3003/activities')
      .then(response => {
        const weeksData = response.data.weeks;
        setActivities(weeksData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  /*
  These two functions will handle the implementation of cycling through
  each day of the week - showing a list of activities within each day
  */
  const handleLeftButtonClick = () => {
    if(currentDayIndex > 0){
      setCurrentDayIndex(currentDayIndex - 1);
      setCurrentDate(getCurrentDate(currentDayIndex - 1));
      
    }
  }

  const handleRightButtonClick = () => {
    if(currentDayIndex < 6){
      setCurrentDayIndex(currentDayIndex + 1);
      setCurrentDate(getCurrentDate(currentDayIndex + 1));
   
    }
  }

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
              <button className="btn btn-primary btn-custom ml-5" data-bs-target="#demo" id="leftbutton" onClick={handleLeftButtonClick}>
                <img src="images/LeftArrow.png" alt="Button 1" className="mr-2" />
              </button>
            </div>
            <div className="flex-fill h2-custom">

            {/* displays the day of the week connected to the db */}
            {activities.map(week => (
                <div key={week._id}>
                  <h2>{week.days[currentDayIndex].name}</h2>
                  <h2>{currentDate}</h2>
                </div>
            ))}
            </div>
            <div className="d-flex align-items-center ml-auto">
              <button className="btn btn-primary btn-custom mr-5" data-bs-target="#demo" id="rightbutton" onClick={handleRightButtonClick}>
                <img src="images/RightArrow.png" alt="Button 2" className="mr-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
    <div>
      {/* Displays the list of activities within each day */}
      <h1>Tasks </h1>
      <ul>
            {activities.map(week => (
              <li key={week._id}>
                <ul>
                  {week.days[currentDayIndex].activities.map(activity => (
                    <li key={activity._id}>
                      {activity.name}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
   

  </div>
    </section>


 
  </div>

    

);
 


}//end app



export default App;
