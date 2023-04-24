import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../css/General.css';
import '../css/Home.css';

function HomePage() {
  return (
    <div className="App">
      <header>
        <div className="Header">
          <a href="/Home.html"><img src="/images/Home.png" className="HomeButton" alt="" /></a>
          <p className="HeaderText">MyFitPlan</p>
          <a href="/Profile.html"><img src="/images/Profile.png" className="ProfileIcon" alt="" /></a>
        </div>
      </header>
      <section className="greet" id="">
        <h2>Cloudy, 11 Deg</h2>
        <h2>Monday, 20 Mar 2023</h2>
      </section>
      <section className="" id="">
        <div className="buttons">
          <div className="activityrel">
            <a href="/Activities.html" id="activity"><img src="/images/Acitivity.png" alt="" /><p>Today's Acitivities</p></a>
            <a href="/Activities.html" className="button activity"></a>
          </div>
          <div className="status">
            <a href="/Activities.html" className="button done" id="status"><p>2 Done</p><img src="/images/Done.png" alt="" /></a>
            <a href="/Activities.html" className="button todo" id="status"><p>2 To Do</p><img src="/images/Todo.png" alt="" /></a>
            <a href="/Activities.html" className="button late" id="status"><p>2 Late</p><img src="/images/Late.png" alt="" /></a>
          </div>
          <div className="inline">
            <a href="/Sleep.html" className="button flex" id="sleep"><img src="images/Sleep.png" alt="" /><p>Sleep</p></a>
            <a href="/Food.html" className="button flex" id="food"><img src="/images/Food.png" alt="" /><p>Food</p></a>
          </div>
          <a href="/Goals.html" className="button flex" id="goals"><img src="images/Goals.png" alt="" /><p>Goals</p></a>
        </div>
      </section>
    </div>
  );
}

export default App;
