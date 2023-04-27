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
import BackBtn from "../images/back.png";
import "../css/AddActivity.css";
import "../css/General.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


function AddActivities() {

    const [selectedActivity, setSelectedActivity] = useState('');
    // Define a new state variable to keep track of the selected button
    const [selectedButton, setSelectedButton] = useState(null);

    const [selectedTextInput, setSelectedTextInput] = useState('');


    
    // to go back to the previous page
    const navigate = useNavigate();
    const goBack = () => {


      navigate('/activities');

    }

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
              <Link to="/" className='add-link'>
                  <img src={Home} className="img-fluid imgAdjustment" alt="Home Button" />
              </Link>
            </button>

            <p className="headingText">MyFitPlan</p>

            <button className="btn headerBtn">
              <Link to="profile" className='add-link'>
                <img src={Profile} className="img-fluid imgAdjustment" alt="Profile Button"  />
              </Link>
            </button>

          </div>

        <div className="pt-3">
          <div className="row">

            <hr id="line" />

          </div>
        </div>
      </header>

      <h1 className='title'>Add a New Activity</h1>

    <Carousel slide={false} interval={null} ref={carouselRef} indicators={false}  controls={false}>
      <Carousel.Item>
        <div style={{ backgroundColor: '#D6D7D9',
            display: 'inline-block', padding: '10px',
            borderRadius: '20px', border:' 2px solid #000000', boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className="vertical-line"></div>
              <button onClick={(event) => handleActivityClick('Run', event)}>
                <img src={Run} className="img-fluid" alt="running image" id="runImage"/>
                <h2 style={{ pointerEvents: 'none' }}>Run</h2>
              </button>
              
              <button onClick={(event) => handleActivityClick('Swim', event)}>
                <img src={Swim} className="img-fluid" alt="swimming image" id="swimImage"/>
                <h2 style={{ pointerEvents: 'none' }}>Swim</h2>
              </button>
              <br></br>
              <div className="vertical-line"></div>
            
              <hr style={{ border: '1px solid #8D8C8C', backgroundColor: '#8D8C8C' }} />
              <button onClick={(event) => handleActivityClick('Yoga',event)}>
                <img src={Yoga} className="img-fluid" alt="yoga image" id="yogaImage"/>
                <h2 style={{ pointerEvents: 'none' }}>Yoga</h2>
              </button>
              <button onClick={(event) => handleActivityClick('Walk',event)}>
                <img src={Walk} className="img-fluid" alt="walking image" id="walkImage"/>
                <h2 style={{ pointerEvents: 'none' }}>Walk</h2>
            </button>
  </div>



      </Carousel.Item>
      <Carousel.Item>

      <div style={{ backgroundColor: '#D6D7D9',
       display: 'inline-block', padding: '10px',
        borderRadius: '20px', border:' 2px solid #000000', boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
             <div className="vertical-line"></div>
            <button onClick={(event) => handleActivityClick('Football',event)}>
                <img src={Football} className="img-fluid" alt="football image" id="footballImage"/>
                <h2 style={{ pointerEvents: 'none' }} >Football</h2>
            </button>
            
            <button onClick={(event) => handleActivityClick('Tennis', event)}>
                <img src={Tennis} className="img-fluid" alt="tennis image" id="tennisImage"/>
                <h2 style={{ pointerEvents: 'none' }}>Tennis</h2>
            </button>
        
            <br></br>
            <div className="vertical-line"></div>
            
            <hr style={{ border: '1px solid #8D8C8C', backgroundColor: '#8D8C8C' }} />
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


    <div className="row justify-content-between pt-5">
        <div className="col-auto">
             {/* Left arrow */}
        <button className="btn btn-primary btn-left" onClick={onPrevClick}>
            <img src={LeftArrow} className="img-fluid" alt="left arrow image" id="leftArrowImage"/>
        </button>
      
        </div>
        <div className="col-auto">
          {/* Right arrow */}
          <button className="btn btn-warning btn-right" onClick={onNextClick}>
              <img src={RightArrow} className="img-fluid" alt="right arrow image" id="rightArrowImage"/>
          </button>
        </div>
    </div>
    
    {/* text input  */}
    <div>
        <label className='text-box-label'>Name</label>
        <br></br>
        <input type="text" placeholder="Enter activity name" id="activityInput" onChange={(event) => setSelectedActivity(event.target.value)} />
    </div>

    {/* Confirm and Back buttons */}
    
    <div className="row justify-content-between pt-5">
        <div className="col-auto">
          <button className="btn-back">
            <div className="d-flex align-items-center">
              <img src={BackBtn} onClick={goBack} className="img-fluid mr-2" alt="Back" />
              <h1 className='h1-back'>Back</h1>
            </div>
          </button>
        </div>
        <div className="col-auto">
          <button onClick={() => {addActivity(); goBack();}} disabled={!selectedActivity} className="btn-confirm">
            <div className="d-flex align-items-center">
              <img src={CheckMark} className="img-fluid mr-2" alt="check mark image" id="checkMarkImage"/>
              <h1 className="h1-confirm">Confirm</h1>
            </div>
          </button>
        </div>
    </div>
      


    </div>
 
     
     

    
    );
}

export default AddActivities