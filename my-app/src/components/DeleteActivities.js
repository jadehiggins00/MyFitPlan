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


function DeleteActivities() {


    // grabbing the activities object
    const [ activities, setActivities] = useState([]);
    // keeping track of the currently display activity
    const [currentIndex, setCurrentIndex] = useState(0);
    const [completedActivities, setCompletedActivities] = useState([]);


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


      function deleteActivity(activityId) {
        console.log(activityId);
        axios.delete(`http://localhost:3003/activitiesmodel/${activityId}`)
          .then(response => {
            console.log('Activity deleted successfully');
            // Remove the deleted activity from the activities state
            setActivities(prevActivities => prevActivities.filter(activity => activity._id !== activityId));
          })
          .catch(error => {
            console.error('Error deleting activity:', error);
            // You can display an error message or handle the error in another way here
          });
      }
      
   
      


    // axios function to get the list of activities from the db
    useEffect(() => {
        axios.get('http://localhost:3003/activitiesmodels')
        .then(response => {
            const activitiesData = response.data.activities;
            setActivities(activitiesData);
            const completedActivitiesData = activitiesData.filter(activity => activity.activityStatus === 1);
            setCompletedActivities(completedActivitiesData);
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
                <button  className="btn btn-primary btn-custom ml-5"  onClick={handleLeftButtonClick}>
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
                <button className="btn btn-primary btn-custom mr-5" onClick={handleRightButtonClick}>
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
        <h1>Select Activities to Delete </h1>

        <div>
            {filteredActivities.map(activity => (
            <div  key={activity._id}>

            
                <button onClick={() => deleteActivity(activity._id)} className="container my-container p-1 my-1 h-25"
                >
                    <div >
                        <div className="row">
                            <div className="col-md-1 p-1">
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
                            <h4 className="p-5">{activity.activity}</h4>
                        </div>
                    </div>
                    </div>
                
                    {/* {completedActivities.includes(activity)
                        ? (
                        <i className="far fa-check-circle"></i>
                        ) : (
                        <i className="far fa-circle"></i>
                        )} */}
                     
                </button>
             
              </div>
           
              
            ))}
          </div>
    

    </div>
</section>

<div>
  
    <Link to="addActivities">
    <img src={Add}  className="btn btn-primary btn-add rounded-circle" />
    </Link>

      {/* Confirm */}
      <button className="btn btn-success" >
            <img src={CheckMark} className="img-fluid" alt="check mark image" id="checkMarkImage"/>
            <h2>Confirm</h2>
        </button>
   
   
</div>


    
    </div>

    );
}

export default DeleteActivities