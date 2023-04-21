import React, {useState, useRef} from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import Swim from "../images/swim.png";
import Walk from "../images/walk.png";
import Run from "../images/run.png";
import Yoga from "../images/yoga.png";
import Tennis from "../images/tennis.png";
import Football from "../images/football.png";
import Basketball from "../images/basketball.png";
import Gym from "../images/gym.png";
import LeftArrow from "../images/LeftArrow.png";
import RightArrow from "../images/RightArrow.png";
import CheckMark from "../images/check.png";
import Home from "../images/Home.png";
import Profile from "../images/user.png";
import BackBtn from "../images/arrowBack.png";
import "../css/AddActivity.css";
import "../css/General.css";

function AddActivities() {

    const [selectedActivity, setSelectedActivity] = useState('');


    // // handle the selection click of activity buttons 
    // const handleActivityClick = (activity) => {
    //     setSelectedActivity(activity);
    // };

    // const handleActivityClick = (activity, event) => {
    //     setSelectedActivity(activity);
    //     const buttons = document.querySelectorAll(".carousel-item button");
    //     buttons.forEach((button) => {
    //       button.classList.remove("selected");
    //     });
    //     event.target.classList.add("selected");
    //   };

      const handleActivityClick = (activity, event) => {
        setSelectedActivity(activity);
        const buttons = document.querySelectorAll(".carousel-item button");
        buttons.forEach((button) => {
          if (button !== event.target) {
            button.disabled = true;
            button.classList.remove("selected");
          } else {
            button.disabled = false;
            button.classList.add("selected");
          }
        });
      };

    // gave the carousel a reference id - to add prev and next buttons
    const carouselRef = useRef(null);

    // carousel prev/next buttons
    const onPrevClick = () => {
      carouselRef.current.prev();
    };
    const onNextClick = () => {
      carouselRef.current.next();
    };



    // function to send POST request to server with current date
    const addActivity = () => {

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        axios.post('http://localhost:3003/activitiesmodel', {
        //   date: getCurrentDate(currentDayIndex)
        date: formattedDate,
        activity: selectedActivity
        })
        .then(response => {
            console.log(response);
            window.location.reload(); // Refresh the page after successful POST
        })
        .catch(error => {
            console.log(error);
        });
    }



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

      <h1>Add Activities</h1>

    <Carousel slide={false} interval={null} ref={carouselRef} indicators={false} className="" >
      <Carousel.Item>
        <button onClick={(event) => handleActivityClick('Running', event)}
        disabled={selectedActivity && selectedActivity !== 'Running'}>
            <img src={Run} className="img-fluid" alt="running image" id="runImage"/>
            <h2>Run</h2>
        </button>
        <button onClick={(event) => handleActivityClick('Swimming', event)}
        disabled={selectedActivity && selectedActivity !== 'Swimming'}>
            <img src={Swim} className="img-fluid" alt="swimming image" id="swimImage"/>
            <h2>Swim</h2>
        </button>
        <br></br>
        <button onClick={(event) => handleActivityClick('Yoga',event)}
        disabled={selectedActivity && selectedActivity !== 'Yoga'}>
            <img src={Yoga} className="img-fluid" alt="yoga image" id="yogaImage"/>
            <h2>Yoga</h2>
        </button>
        <button onClick={(event) => handleActivityClick('Walking',event)}
        disabled={selectedActivity && selectedActivity !== 'Walking'}>
            <img src={Walk} className="img-fluid" alt="walking image" id="walkImage"/>
            <h2>Walk</h2>
        </button>
      </Carousel.Item>
      <Carousel.Item>

        <div className="container ">
            <button onClick={(event) => handleActivityClick('Football',event)}>
                <img src={Football} className="img-fluid" alt="football image" id="footballImage"/>
                <h2>Football</h2>
            </button>
            <button onClick={(event) => handleActivityClick('Tennis', event)}>
                <img src={Tennis} className="img-fluid" alt="tennis image" id="tennisImage"/>
                <h2>Tennis</h2>
            </button>
        
            <br></br>
            <button onClick={(event) => handleActivityClick('Gym', event )}>
                <img src={Gym} className="img-fluid" alt="gym image" id="gymImage"/>
                <h2>Gym</h2>
            </button>
            <button onClick={(event) => handleActivityClick('Basketball',event)}>
                <img src={Basketball} className="img-fluid" alt="Basketball image" id="BasketballImage"/>
                <h2>Basketball</h2>
            </button>
        </div>
    

      
      </Carousel.Item>
 
    </Carousel>

    {/* Left and Right arrows */}
    <div>

        {/* Left arrow */}
        <button className="btn btn-primary" onClick={onPrevClick}>
            <img src={LeftArrow} className="img-fluid" alt="left arrow image" id="leftArrowImage"/>
        </button>
       
        {/* Right arrow */}
        <button className="btn btn-warning" onClick={onNextClick}>
            <img src={RightArrow} className="img-fluid" alt="right arrow image" id="rightArrowImage"/>
        </button>
    </div>
    
    {/* text input  */}
    <div>
        <label>Name your Activity</label>
        <br></br>
        <input type="text" placeholder="Enter activity name" onChange={(event) => setSelectedActivity(event.target.value)} />
    </div>

    {/* Confirm and Back buttons */}
    <div>

        <button className="btn btn-secondary">
            <img id="icon_back" src={BackBtn}  className="img-fluid"/>
            <p>Back</p>
        </button>
        {/* Confirm */}
        <button onClick={addActivity} disabled={!selectedActivity} className="btn btn-success" >
            <img src={CheckMark} className="img-fluid" alt="check mark image" id="checkMarkImage"/>
            <h2>Confirm</h2>
        </button>
       
    </div>
    </div>
 
     
     

    
    );
}

export default AddActivities