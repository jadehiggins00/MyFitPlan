import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Run from "../images/run.png";
import Football from "../images/football.png";
import Swim from "../images/swim.png";
import Walk from "../images/walk.png";

import Yoga from "../images/yoga.png";
import Tennis from "../images/tennis.png";

import Basketball from "../images/basketball.png";
import Gym from "../images/gym.png";
import PreviousBtn from "../images/previous.png";
import NextBtn from "../images/next.png";
import CheckMark from "../images/check.png";
import Home from "../images/Home.png";
import Profile from "../images/user.png";
import BackBtn from "../images/arrowBack.png";
import Add from "../images/plus-v2.png";
import "../css/Activities.css";
import "../css/General.css";


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
    // Filter the activities by the current date
    const displayDay = activities.filter(activity => activity.dayOfWeek === activities[currentIndex].dayOfWeek);

    return (
        <div>
        <header>
        <div className="Header">
            <button className="btn btn-home bg-none">
            <a href="Home.html">
                <img src={Home} className="img-fluid" alt="" />
            </a>
            </button>
            <p className="HeaderText p-5">MyFitPlan</p>
            <button className="btn btn-profile bg-none">
            <a href="Profile.html">
                <img src={Profile} className="img-fluid p-4" alt="" />
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
                    <img src={PreviousBtn} alt="Button 1" className="mr-2" />
                </button>
                </div>
                <div className="flex-fill h2-custom">
              
    
                
                {activities.length > 0 && (
                    <div>
                          <p>{activities[currentIndex].dayOfWeek}</p>
                        <p>{activities[currentIndex].date}</p>
                    </div>
                )}
                </div>
                <div className="d-flex align-items-center ml-auto">
                <button className="btn btn-primary btn-custom mr-5" data-bs-target="#demo" id="rightbutton" onClick={handleRightButtonClick}>
                    <img src={NextBtn} alt="Button 2" className="mr-2" />
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

        <div>
            {filteredActivities.map(activity => (
            <div  key={activity._id}>

            
                <button className="container my-container p-4 my-4 h-25">
                    <div >
                        <div className="row">
                            <div className="col-md-6 p-4">
                                {activity.activity.includes("Run") && <img src={Run} alt="Running  image" />}
                                {activity.activity.includes("Football") && <img src={Football} alt="Football image" />}
                                {activity.activity.includes("Swim") && <img src={Swim} alt="Swimming image" />}
                                {activity.activity.includes("Yoga") && <img src={Yoga} alt="Yoga image" />}
                                {activity.activity.includes("Gym") && <img src={Gym} alt="Gym image" />}
                                {activity.activity.includes("Walk") && <img src={Walk} alt="Walking image" />}
                                {activity.activity.includes("Tennis") && <img src={Tennis} alt="Tennis image" />}
                                {activity.activity.includes("Basketball") && <img src={Basketball} alt="Basketball image" />}
                            </div>
                        <div className="col-md-6 text-center">
                            <h1 className="p-5">{activity.activity}</h1>
                        </div>
                    </div>
                    </div>
                    
                    <i class="far fa-circle"></i> To Be Complete 
                </button>
             
              </div>
           
              
            ))}
          </div>
    

    </div>
</section>

<div>
  
    <Link to="addActivities">
    <img src={Add} alt="Button 2" className="btn btn-primary btn-add rounded-circle" />
    </Link>
   
   
</div>


    
    </div>

    );
}

export default Activities