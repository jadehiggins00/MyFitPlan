import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";



function Activities() {


    // grabbing the activities object
    const [ activities, setActivities] = useState([]);
    // keeping track of the currently display activity
    const [currentIndex, setCurrentIndex] = useState(0);



    const handleLeftButtonClick = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      };
      
      const handleRightButtonClick = () => {
        if (currentIndex < activities.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      };
      


    // axios function to get the list of activities from the db
    useEffect(() => {
        axios.get('http://localhost:3003/activitiesmodels')
        .then(response => {
            const activitiesData = response.data.activities;
            setActivities(activitiesData);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    // Filter the activities by the current date
    const filteredActivities = activities.filter(activity => activity.date === activities[currentIndex].date);

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
                {/* <img src={logo} className="img-fluid p-4" alt="" /> */}
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
              
    
                
                {activities.length > 0 && (
                    <div>
                        <p>{activities[currentIndex].date}</p>
                    </div>
                )}
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
            {filteredActivities.map(activity => (
            
              <li key={activity._id}>
                <p>Activity: {activity.activity}</p>
              </li>
            ))}
          </ul>
    

    </div>
        </section>

<div>
    <Link to="addActivities">Add Activity</Link>
</div>


    
    </div>

    );
}

export default Activities