import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../css/Home.css';
import axios from 'axios';

import WeatherWidget from './Weather';
import HomeBtn from "../images/Home.png";
import Profile from "../images/user.png";
import Done from '../images/Done.png';
import Todo from '../images/Todo.png';
import Late from '../images/Late.png';
import Activity from '../images/Activity.png';
import Food from '../images/food.png';
import Goals from '../images/goals.png';

function Home() {
  const [doneCount, setDoneCount] = useState(0);
  const [notDoneCount, setNotDoneCount] = useState(0);
  const [lateCount, setLateCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3003/activitiesmodels')
      .then(response => {
        const activitiesData = response.data.activities;

        // Get today's and yesterday's day of the week
        const today = new Date();
        const dayOfWeekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayDayOfWeek = dayOfWeekArray[today.getDay()];
        const yesterdayDayOfWeek = dayOfWeekArray[(today.getDay() - 1 + 7) % 7];

        // Filter activities for today and yesterday
        const todayActivities = activitiesData.filter(activity => activity.dayOfWeek === todayDayOfWeek);
        const yesterdayActivities = activitiesData.filter(activity => activity.dayOfWeek === yesterdayDayOfWeek);

        // Count done and not done activities for today
        const done = todayActivities.filter(activity => activity.activityStatus === 1).length;
        const notDone = todayActivities.filter(activity => activity.activityStatus === 0).length;

        // Count unfinished activities for yesterday
        const late = yesterdayActivities.filter(activity => activity.activityStatus === 0).length;

        setDoneCount(done);
        setNotDoneCount(notDone);
        setLateCount(late);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
           <header>
        <div className="Header">

        <button className="btn headerBtn">
          <Link to="/" className='add-link'>
              <img src={HomeBtn} className="img-fluid" alt="Home Button" />
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

  <section className="greet" id="">
  <WeatherWidget />
  </section>
    <section className="parent-section" id="">

      <div className="activity-container">
  <div className="activityrel">
    <Link to="activities" id="activity">
      <img src={Activity} alt="" />
      <p>Today's Activities</p>
    </Link>
    <Link to="activities" className="activity"></Link>
  </div>
  <div className="status">
    <Link to="activities" className="done" id="status">
      <p>{doneCount} Done</p>
      <img src={Done} alt="" />
    </Link>
    <Link to="activities" className="todo" id="status">
      <p>{notDoneCount} To Do</p>
      <img src={Todo} alt="" />
    </Link>
    <Link to="activities" className="late" id="status">
      <p>{lateCount} Late</p>
      <img src={Late} alt="" />
    </Link>
  </div>
</div>
    <div className="button-container">
      <div className="buttons">
        <Link to="food" className="button flex" id="food"><img src={Food} alt="" /><p>Food</p></Link>
        <Link to="goals" className="button flex" id="goals"><img src={Goals} alt="" /><p>Goals</p></Link>
      </div>
      </div>
    </section>
  </div>
  );
}

export default Home;