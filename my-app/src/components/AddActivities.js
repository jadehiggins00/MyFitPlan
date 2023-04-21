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
import "../css/AddActivity.css";
import "../css/General.css";

function AddActivities() {

    const [selectedActivity, setSelectedActivity] = useState('');


    // handle the selection click of activity buttons 
    const handleActivityClick = (activity) => {
        setSelectedActivity(activity);
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
            <h1>Add Activities</h1>


    

    <Carousel slide={false} interval={null} ref={carouselRef} indicators={false} >
      <Carousel.Item>
        <button onClick={() => handleActivityClick('Running')}>
            <img src={Run} className="img-fluid" alt="running image" id="runImage"/>
        </button>
        <button onClick={() => handleActivityClick('Swimming')}>
            <img src={Swim} className="img-fluid" alt="swimming image" id="swimImage"/>
        </button>
        <br></br>
        <button onClick={() => handleActivityClick('Yoga')}>
            <img src={Yoga} className="img-fluid" alt="yoga image" id="yogaImage"/>
        </button>
        <button onClick={() => handleActivityClick('Walking')}>
            <img src={Walk} className="img-fluid" alt="walking image" id="walkImage"/>
        </button>
      </Carousel.Item>
      <Carousel.Item>
        <button onClick={() => handleActivityClick('Football')}>
            <img src={Football} className="img-fluid" alt="football image" id="footballImage"/>
        </button>
        <button onClick={() => handleActivityClick('Tennis')}>
            <img src={Tennis} className="img-fluid" alt="tennis image" id="tennisImage"/>
        </button>
      
        <br></br>
        <button onClick={() => handleActivityClick('Gym')}>
            <img src={Gym} className="img-fluid" alt="gym image" id="gymImage"/>
        </button>
        <button onClick={() => handleActivityClick('Basketball')}>
            <img src={Basketball} className="img-fluid" alt="Basketball image" id="BasketballImage"/>
        </button>

      
      </Carousel.Item>
 
    </Carousel>
    <div>
        <button className="btn btn-primary" onClick={onPrevClick}>prev</button>
       
        <button onClick={addActivity} disabled={!selectedActivity}>Confirm</button>

        <button className="btn btn-warning" onClick={onNextClick}>Next</button>
        </div>
    </div>
     
     

    
    );
}

export default AddActivities