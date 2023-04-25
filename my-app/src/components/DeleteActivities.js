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
import PreviousBtn from "../images/prev.png";
import NextBtn from "../images/next.png";
import CheckMark from "../images/check.png";
import Home from "../images/Home.png";
import Profile from "../images/user.png";
import Remove from "../images/remove.png";
import BackBtn from "../images/back.png";
import Add from "../images/plus.png";
import "../css/DeleteActivity.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


function DeleteActivities() {


    // grabbing the activities object
    const [ activities, setActivities] = useState([]);
    // keeping track of the currently display activity
    const [currentIndex, setCurrentIndex] = useState(0);
    const [completedActivities, setCompletedActivities] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);

    // to go back to the previous page
    const navigate = useNavigate();
    const goBack = () => {


      navigate('/activities');

    }


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
        setSelectedActivities(prevSelectedActivities =>
          prevSelectedActivities.includes(activityId)
            ? prevSelectedActivities.filter(id => id !== activityId)
            : [...prevSelectedActivities, activityId]
        );
    }

    function deleteSelectedActivities() {
        selectedActivities.forEach(activityId => {
          axios.delete(`http://localhost:3003/activitiesmodel/${activityId}`)
            .then(response => {
              console.log(`Activity ${activityId} deleted successfully`);
              // Remove the deleted activity from the activities state
              setActivities(prevActivities =>
                prevActivities.filter(activity => activity._id !== activityId)
              );
            })
            .catch(error => {
              console.error(`Error deleting activity ${activityId}:`, error);
              // You can display an error message or handle the error in another way here
            });
        });
        setSelectedActivities([]);
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

          <button className="btn headerBtn">
            <a href="#">
              <img src={Home} className="img-fluid" alt="Home Button" />
            </a>
          </button>

          <p className="HeaderText">MyFitPlan</p>

          <button className="btn headerBtn">
            <a href="#">
              <img src={Profile} className="img-fluid" alt="Profile Button" />
            </a>
          </button>

        </div>

        <div className="pt-3">
          <div className="row">

            <hr id="line" />

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
                          <h1 className="dayOfWeek">{activities[currentIndex].dayOfWeek}</h1>
                        <h1 className='date'>{activities[currentIndex].date}</h1>
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
        <h1 className='h1-delete p-5'>Select Activities to Delete </h1>

        
    
    <div className="container activities-container justify-content-center">
  <div className="row">
    {filteredActivities.map(activity => (
      <div className="col-sm-4 col-md-4 col-lg-6 mb-1" key={activity._id}>
         {/* change button colour when selected */}
         <button id="activity-button" onClick={() => deleteActivity(activity._id)} 
                className={` 
                ${selectedActivities.includes(activity._id) ? 'selectedColour' : ''}`}>

                 
          <div className="d-flex align-items-center p-3">
                {/* add remove image when selected */}
                {selectedActivities.includes(activity._id) ? 
                                <img src={Remove} alt="Selected"/> :
                                ''}
            <div className="flex-grow-1">
              <div className="row align-items-center">
                <div className="col-md-4 ">
                  {activity.activity.includes("Run") && <img className="img-activity" src={Run} alt="Running  image" />}
                  {activity.activity.includes("Football") && <img className="img-activity" src={Football} alt="Football image" />}
                  {activity.activity.includes("Swim") && <img className="img-activity" src={Swim} alt="Swimming image" />}
                  {activity.activity.includes("Yoga") && <img className="img-activity" src={Yoga} alt="Yoga image" />}
                  {activity.activity.includes("Gym") && <img className="img-activity" src={Gym} alt="Gym image" />}
                  {activity.activity.includes("Walk") && <img className="img-activity" src={Walk} alt="Walking image" />}
                  {activity.activity.includes("Tennis") && <img className="img-activity" src={Tennis} alt="Tennis image" />}
                  {activity.activity.includes("Basketball") && <img className="img-activity" src={Basketball} alt="Basketball image" />}
                </div>
                <div className="col-md-8 text-center ">
                  <h4 className="h4-activity  ">{activity.activity}</h4>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    ))}
  </div>
</div>

    </div>
</section>




    {/* Confirm and Back buttons */}
    
    <div className="row justify-content-between pt-5">
  <div className="col-auto">
    <button className="btn btn-back btn-lg p-2" onClick={goBack}>
      <div className="d-flex align-items-center">
        <img src={BackBtn} className="img-fluid mr-2" alt="Back" />
        <h1 className='h1-back'>Back</h1>
      </div>
    </button>
  </div>
  <div className="col-auto">
    <button className="btn btn-confirm btn-lg" onClick={deleteSelectedActivities}>
      <div className="d-flex align-items-center">
        <img src={CheckMark} className="img-fluid " alt="check mark image" id="checkMarkImage"/>
        <h1 className="h1-confirm">Confirm</h1>
      </div>
    </button>
  </div>
</div>


    
    </div>

    );
}

export default DeleteActivities