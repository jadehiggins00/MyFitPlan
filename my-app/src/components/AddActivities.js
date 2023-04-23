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
import LeftArrow from "../images/prev.png";
import RightArrow from "../images/next.png";
import CheckMark from "../images/check.png";
import Home from "../images/Home.png";
import Profile from "../images/user.png";
import BackBtn from "../images/arrowBack.png";
import "../css/AddActivity.css";
import "../css/General.css";

function AddActivities() {

    const [selectedActivity, setSelectedActivity] = useState('');
    // Define a new state variable to keep track of the selected button
    const [selectedButton, setSelectedButton] = useState(null);

    const [selectedTextInput, setSelectedTextInput] = useState('');


    const handleActivityClick = (activity, event) => {
      setSelectedActivity(activity);
      setSelectedTextInput(`Play ${activity}`); // Update the text input with the selected activity
      const newSelectedButton = event.target;
      if (selectedButton) {
        selectedButton.classList.remove("selected");
      }
      newSelectedButton.classList.add("selected");
      setSelectedButton(newSelectedButton);

       // Get a reference to the activity input element
      const activityInput = document.getElementById("activityInput");

      // Set the value of the activity input element to the selected activity
      activityInput.value = `${activity} for 30 Minutes`;
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

        const currentDate= new Date();
        const currentDay= new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        const formattedDay = currentDay.toLocaleDateString('en-US', { weekday: 'long' });
        console.log(`Today is ${formattedDay}`);

        axios.post('http://localhost:3003/activitiesmodel', {
        //   date: getCurrentDate(currentDayIndex)
        date: formattedDate,
        dayOfWeek: formattedDay,
        activity: selectedActivity,
        activityStatus: 0
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
        <button onClick={(event) => handleActivityClick('Run', event)}>
            <img src={Run} className="img-fluid" alt="running image" id="runImage"/>
            <h2 style={{ pointerEvents: 'none' }}>Run</h2>
        </button>
        <button onClick={(event) => handleActivityClick('Swim', event)}>
            <img src={Swim} className="img-fluid" alt="swimming image" id="swimImage"/>
            <h2 style={{ pointerEvents: 'none' }}>Swim</h2>
        </button>
        <br></br>
        <button onClick={(event) => handleActivityClick('Yoga',event)}>
            <img src={Yoga} className="img-fluid" alt="yoga image" id="yogaImage"/>
            <h2 style={{ pointerEvents: 'none' }}>Yoga</h2>
        </button>
        <button onClick={(event) => handleActivityClick('Walk',event)}>
            <img src={Walk} className="img-fluid" alt="walking image" id="walkImage"/>
            <h2 style={{ pointerEvents: 'none' }}>Walk</h2>
        </button>
      </Carousel.Item>
      <Carousel.Item>

        <div className="container ">
            <button onClick={(event) => handleActivityClick('Football',event)}>
                <img src={Football} className="img-fluid" alt="football image" id="footballImage"/>
                <h2 style={{ pointerEvents: 'none' }}>Football</h2>
            </button>
            <button onClick={(event) => handleActivityClick('Tennis', event)}>
                <img src={Tennis} className="img-fluid" alt="tennis image" id="tennisImage"/>
                <h2 style={{ pointerEvents: 'none' }}>Tennis</h2>
            </button>
        
            <br></br>
            <button onClick={(event) => handleActivityClick('Gym', event )}>
                <img src={Gym} className="img-fluid" alt="gym image" id="gymImage"/>
                <h2 style={{ pointerEvents: 'none' }}>Gym</h2>
            </button>
            <button onClick={(event) => handleActivityClick('Basketball',event)}>
                <img src={Basketball} className="img-fluid" alt="Basketball image" id="BasketballImage"/>
                <h2 style={{ pointerEvents: 'none' }}>Basketball</h2>
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
        <label>Set a Time</label>
        <br></br>
        <input type="text" placeholder="Enter activity name" id="activityInput" onChange={(event) => setSelectedActivity(event.target.value)} />
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