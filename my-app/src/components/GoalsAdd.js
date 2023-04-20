import { useState, useEffect } from "react";
import '../css/GeneralGoals.css';
import '../css/GoalsAdd.css';
import { Link } from "react-router-dom";



function GoalsAdd() {
    const [date, setDate] = useState(new Date());

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
    return (

    <body class="" data-lang="en">
        <header>
            <div  class="Header">
            <a href="Home.html" ><img src="images/Home.png" className="HomeButton" alt=""/></a>
            <p className="HeaderText">Goals</p>
            <a href="Profile.html" ><img src="images/Profile.png" className="ProfileIcon" alt=""/></a>
            </div>
        </header>
        <main>
            <form method="post" autocomplete="off">
            <p className="instructions1">1. Pick a day to set a goal</p>
            <div className="holder">
                <div className="calendar">
                <div className="month">
                    <i className="fas fa-angle-left prev"></i>
                    <div className="date">
                    <h1></h1> 
                    <p></p>
                    </div>
                    <i className="fas fa-angle-right next"></i>
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
            <input type="text" id="gtext" name="goaltext" placeholder="" required/>
            
            <div className="BottomGoalsAddButtons">
            <Link to="/goals" className="back">&larr; Back</Link>
                <button type="submit" className="confirm">&check; Confirm</button>
            </div>
            </form>
            
        
        {/* <script src="GoalsCalander.js" ></script> */}
        </main>
    </body>


    )
}

export default GoalsAdd