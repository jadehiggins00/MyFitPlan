import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../css/Activities.css";


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
import Profile from "../images/account.png";
import Delete from "../images/delete (1).png";
import BackBtn from "../images/arrowBack.png";
import Add from "../images/plus.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';



function Activities() {


    // grabbing the activities object
    const [ activities, setActivities] = useState([]);
    // keeping track of the currently display activity
    const [currentIndex, setCurrentIndex] = useState(0);
    const [completedActivities, setCompletedActivities] = useState([]);


    // to go back to the previous page
    const navigate = useNavigate();
    const goBack = () => {


      navigate('/');

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

      const handleActivityClick = (activity) => {
        if (completedActivities.includes(activity)) {
          setCompletedActivities((prev) =>
            prev.filter((completedActivity) => completedActivity !== activity) 
        );

        // Make axios post request to update the activity's completion status in the database
        axios.put(`http://localhost:3003/activitiesmodel/${activity._id}`, {
            activityStatus: 0
        })
            .then(response => {
            console.log(response);
            })
            .catch(error => {
            console.log(error);
            });
        } else {
          setCompletedActivities((prev) => [...prev, activity]);

            // Make axios post request to update the activity's completion status in the database
            axios.put(`http://localhost:3003/activitiesmodel/${activity._id}`, {
                activityStatus: 1
            })
                .then(response => {
                console.log(response);
                })
                .catch(error => {
                console.log(error);
                });
        }
      };
      


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
          <Link to="/" className='add-link'>
              <img src={Home} className="img-fluid" alt="Home Button" />
            </Link>
          </button>

          <p className="HeaderText">MyFitPlan</p>

          <button className="btn headerBtn">
            <Link to="profile" className='add-link p-1'>
              <img src={Profile} className="img-fluid" alt="Profile Button"  />
            </Link>
          </button>

        </div>

        <div className="pt-3">
          <div className="row">

            <hr id="line" />

          </div>
        </div>
      </header>

        <section className="Date" id="">
        <div className="container-fluid p-5">
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
                <div className="d-flex align-items-center ml-auto" >
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
<div className="container activities-container justify-content-center">
  <div className="row">
    {filteredActivities.map(activity => (
      <div className="col-sm-4 col-md-4 col-lg-6 mb-1" key={activity._id}>
        <button className={completedActivities.includes(activity) ? 'activity-button completed' : 'activity-button'} onClick={() => handleActivityClick(activity)}>
          <div className="d-flex align-items-center p-3">
            {completedActivities.includes(activity) && <i className="far fa-check-circle"></i>}
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

<div className="d-flex justify-content-center flex-column align-items-center">
  <div className="d-flex justify-content-between align-items-center mb-3" id="add-remove-buttons">
    <Link to="addActivities" className='add-link'>
      <img src={Add} className="btn btn-primary btn-add rounded-circle" />
    </Link>
    <Link to="deleteActivities" className='add-link'>
      <img src={Delete} className="btn btn-primary btn-remove rounded-circle" />
    </Link>
  </div>
  <div>
    {/* back button - goes to homepage */}
    <button className="btn btn-back btn-lg" onClick={goBack}>
      <div className="d-flex align-items-center">
        <img src={BackBtn} className="img-fluid mr-2" alt="Back" />
        <h1 className='h1-back'>Back</h1>
      </div>
    </button>
  </div>
</div>




    
    </div>

    );
}

export default Activities