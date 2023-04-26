import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import '../css/GeneralGoals.css';
import '../css/GoalsAdd.css';
import { Link } from "react-router-dom";

import Home from '../images/Home.png';
import Profile from '../images/account.png';
import Mic from '../images/mic.png';
import 'bootstrap/dist/css/bootstrap.min.css';


function GoalsAdd() {

  const username = localStorage.getItem('username');



  const [date, setDate] = useState(new Date());
  const [goalText, setGoalText] = useState('');
  const textInputRef = useRef();
  


  useEffect(() => {
    renderCalendar();
  }, []);

  const renderCalendar = () => {
    date.setDate(1);

    const monthDays = document.querySelector(".days");

    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    const prevLastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();  

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    document.querySelector(".date h1").innerHTML = months[date.getMonth()];

    document.querySelector(".date p").innerHTML =
      "Today: " + new Date().toDateString();

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
      days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
      if (
        i === new Date().getDate() &&
        date.getMonth() === new Date().getMonth()
      ) {
        days += `<div class="today">${i}</div>`;
      } else {
        days += `<div>${i}</div>`;
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="next-date">${j}</div>`;
      monthDays.innerHTML = days;
    }

    const dayElements = monthDays.querySelectorAll("div");
    dayElements.forEach((day) => {
      day.addEventListener("click", () => {
        console.log(day.innerHTML);
        console.log(months[date.getMonth()]); //0 = jan, 1 = feb, 2 = march
        console.log(date.getFullYear());
        const selectedDate = `${day.innerHTML} ${
          months[date.getMonth()]
        } ${date.getFullYear()}`;
        document.querySelector("#selectedDate").value = selectedDate;
        console.log(selectedDate);
        dayElements.forEach((day) => {
          day.classList.remove("selected");
          day.classList.remove("today");
        });
        day.classList.add("selected");
      });
    });
  };

  const handlePrevClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
    renderCalendar();
  };

  const handleNextClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
    renderCalendar();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedDate = document.querySelector("#selectedDate").value;
    const goaltext = document.querySelector("#gtext").value;
    const goalstat = 0;

    //console.log("Hey" + username )
    axios.post('http://localhost:3003/goalsmodel', {
      //   date: getCurrentDate(currentDayIndex)
      userName: username,
      goal_text: goaltext,
      goal_date: selectedDate,
      goal_status: goalstat
      })
      .then(response => {
          console.log(response);
          window.location.href = '/goals'; // Refresh the page after successful POST
      })
      .catch(error => {
          console.log(error);
      });  
    };

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
      <main>
        <form method="post" onSubmit={handleSubmit} autocomplete="off">
          <p className="instructions1">.</p>
          <div className="holder">
            <div className="calendar">
              <div className="month">
                <i className="fas fa-angle-left prev" onClick={handlePrevClick}></i>
                <div className="date">
                  <h1></h1> 
                  <p></p>
                </div>
                <i className="fas fa-angle-right next" onClick={handleNextClick}></i>
              </div>
              <div className="weekdays">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              <div className="days"></div>
              <input type="hidden" name="selectedDate" id="selectedDate" required/>
            </div>
          </div>

          <p className="instructions">2. What is your goal</p>
          <input type="text" id="gtext" ref={textInputRef} name="goaltext" placeholder="" required onChange={(event) => setGoalText(event.target.value)} />
          

          <div className="BottomGoalsAddButtons">
            <Link to="/goals" className="back">&larr; Back</Link>
            <button type="submit" className="confirm">&#10003; Confirm</button>
          </div>
        </form>
      </main>
    </div>


    )
}

export default GoalsAdd