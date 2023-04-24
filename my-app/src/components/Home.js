import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../css/General.css';
import '../css/Home.css';
import Header from './Reusable/Header';

import HomeBtn from '../images/Home.png';
import Done from '../images/Done.png';
import Todo from '../images/Todo.png';
import Late from '../images/Late.png';
import Activity from '../images/Activity.png';
import Sleep from '../images/Sleep.png';
import Food from '../images/food.png';
import Goals from '../images/goals.png';

function Home() {
  const [doneCount, setDoneCount] = useState(0);
  const [todoCount, setTodoCount] = useState(0);
  const [lateCount, setLateCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      //const activities = await fetchActivities();
      // const done = activities.filter(activity => activity.status === 'done').length;
      // const todo = activities.filter(activity => activity.status === 'todo').length;
      // const late = activities.filter(activity => activity.status === 'late').length;

      //setDoneCount(done);
      //setTodoCount(todo);
      //setLateCount(late);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
    <Header title="MyFitPlan"/>
      <section className="greet" id="">
        <h2>Cloudy, 11 Deg</h2>
        <h2>Monday, 20 Mar 2023</h2>
      </section>
      <section className="" id="">
        <div className="buttons">
          <div className="activityrel">
            <Link to="activities" id="activity"><img src={Activity} alt="" /><p>Today's Acitivities</p></Link>
            <Link to="activities" className="button activity"></Link>
          </div>
          <div className="status">
            <Link to="activities" className="done" id="status"><p>{doneCount} Done</p><img src={Done} alt="" /></Link>
            <Link to="activities" className="todo" id="status"><p>{todoCount} To Do</p><img src={Todo} alt="" /></Link>
            <Link to="activities" className="late" id="status"><p>{lateCount} Late</p><img src={Late} alt="" /></Link>
          </div>
          <div className="pt-3">
        <div className="row">
          <hr id="line" />
        </div>
      </div>
          <div className="inline">
            <Link to="sleep" className="button flex" id="sleep"><img src={Sleep} alt="" /><p>Sleep</p></Link>
            <Link to="food" className="button flex" id="food"><img src={Food} alt="" /><p>Food</p></Link>
          </div>
          <Link to="goals" className="button flex" id="goals"><img src={Goals} alt="" /><p>Goals</p></Link>
        </div>
      </section>
    </div>
  );
}

export default Home;