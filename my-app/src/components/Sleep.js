import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../css/Sleep.css';

import Home from '../images/Home.png';
import Profile from '../images/user.png';
import sleep_bedTime from '../images/bedtime.png';
import sleep_awakeTime from '../images/awaketime.png';
import backBtn from '../images/arrowBack.png';
import bar from '../images/sleep_verticalBar.png';
import arrowLeft from '../images/LeftArrow.png'
import arrowRight from '../images/RightArrow.png'

import 'bootstrap/dist/css/bootstrap.min.css';

function Sleep() 
{
  
  const weekdays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  //using a state var to set the currentDay to monday (0)
  const [currentDayIndex, setCurrentDayIndex] = useState(0);


  // Create a function to get the date based on the current day index
  const getCurrentDate = (dayIndex) => 
  {

    const today = new Date();

    // this line of code controls the date aligning with the day
    today.setDate(today.getDate()  + (dayIndex - today.getDay() + 1));

    //format of day 
    return `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${(today.getFullYear()).toString().padStart(2, "0")}`;

    currentDayIndex = today.getDay();

  };

  const [currentDate, setCurrentDate] = useState(getCurrentDate(0));

  // // axios function to get the list of activities from the db
  // useEffect(() => 
  // {

  //   axios.get('http://localhost:3003/activities').then(response => 
  //   {
  //     const weeksData = response.data.weeks;
  //     setActivities(weeksData);
  //   }).catch(error => 
  //   {
  //     console.log(error);
  //   });
  // }, []);

  const handleUpButtonClick = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
      setCurrentDate(getCurrentDate(currentDayIndex - 1));
    } else {
      setCurrentDayIndex(6);
      setCurrentDate(getCurrentDate(6));
    }
  };
  
  const handleDownButtonClick = () => {
    if (currentDayIndex < 6) {
      setCurrentDayIndex(currentDayIndex + 1);
      setCurrentDate(getCurrentDate(currentDayIndex + 1));
    } else {
      setCurrentDayIndex(0);
      setCurrentDate(getCurrentDate(0));
    }
  };

  return (
    <div>
      <header>
        <div className="Header">

          <button className="btn headerBtn">
            <a href="#">
              <img src={Home} className="img-fluid" alt="Home Button" />
            </a>
          </button>

          <p className="HeaderText">Sleep</p>

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

      {/* ----------- BELOW HEADER ---------------- */}

      

      <section>
        {/* <div className="verticalBar">
          <div className="verticalBarBar">
            <div className="verticalBarHalf">
            </div>
            <div className="verticalBarHalf">
            </div>
          </div>
          <div className="cursor_bedtime">
            9:10 am
          </div>
        </div> */}
        <div className="verticalBar">

          <div className='blueBar'></div>

          <img id="image_bar" src={bar} />

          <div className="days">
            <div id="day1">
              {weekdays[currentDayIndex]}
            </div>
            <div id="day2">
              {currentDayIndex+1 == 7 ? weekdays[currentDayIndex-6] : weekdays[currentDayIndex+1]}
            </div>
          </div>

          <div className="upDownBtns">
            <button className="buttonUp" onClick={handleUpButtonClick}>
              <img src={arrowLeft} className="imgUp" />
            </button>
            <button className="buttonDown" onClick={handleDownButtonClick}>
              <img src={arrowRight} className="imgDown" />
            </button>
          </div>

        </div>

        

        <div id="buttons">
            <button id="button_sleepTime">
                <img id="icon_bedtime" src={sleep_bedTime} />
                <p>Set Bed time</p>
            </button>

            <button id="button_awakeTime">
                <img id="icon_awaketime" src={sleep_awakeTime} />
                <p>Set Awake time</p>
            </button>
        </div>

        <button class="button_back">
            <img id="icon_back" src={backBtn} />
            <p>Back</p>
        </button>
      </section>
    </div>
  );
 


}//end app

export default Sleep;
