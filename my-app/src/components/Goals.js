import React, { useEffect } from 'react';
import '../css/GeneralGoals.css';
import '../css/Goals.css';
import { Link } from "react-router-dom";
import Home from '../images/Home.png';
import Profile from '../images/Profile.png';
import addtext from '../images/addtext.png';
import deletetext from '../images/deletetext.png';

function Goals() {
  useEffect(() => {
    const checkstatus = document.querySelectorAll(".goals");
    const find = /\bCompleted\b/i;
    for (let i = 0; i < checkstatus.length; i++) {
      const checkEach = checkstatus[i];
      if (find.test(checkEach.innerHTML)) {
        checkEach.style.backgroundColor = '#94BFA2';
      } else {
        checkEach.style.backgroundColor = '#D6D7D9';
      }
    }
  }, []);

  const handleGoalButtonClick = (event) => {
    const button = event.target;
    const goalStatus = button.getAttribute("data-GoalStatus");

    if (goalStatus === "0") {
      button.setAttribute("data-GoalStatus", "1");
      button.innerHTML =
        "<i class='fas fa-check-circle'></i> Completed: " + button.innerHTML.split(": ")[1];
      button.style.backgroundColor = "#94BFA2";
    } else {
      button.setAttribute("data-GoalStatus", "0");
      button.innerHTML =
        "<i class='far fa-circle'></i> To Be Complete: " + button.innerHTML.split(": ")[1];
      button.style.backgroundColor = "#D6D7D9";
    }
  };

  return (
    <body className="" data-lang="en">
      <header>
        <div className="Header">
          <button className="btn headerBtn">
            <a href="#">
              <img src={Home} className="img-fluid" alt="Home Button" />
            </a>
          </button>
          <p className="HeaderText">Goals</p>
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
      <main>
        <section className="container">
          <div className="GoalsList">
            <h2 className="CenterText">For Sunday, 19 March 2023</h2>
            <button className="goals" data-GoalStatus="1" onClick={handleGoalButtonClick}>
              <i className="fas fa-check-circle"></i> Completed: task1
            </button>
            <button className="goals" data-GoalStatus="0" onClick={handleGoalButtonClick}>
              <i className="far fa-circle"></i> To Be Complete: task2
            </button>
            <button className="goals" data-GoalStatus="0" onClick={handleGoalButtonClick}>
              <i className="far fa-circle"></i> To Be Complete: task3
            </button>
            <button className="goals" data-GoalStatus="1" onClick={handleGoalButtonClick}>
              <i className="fas fa-check-circle"></i> Completed: task4
            </button>
          </div>

          <div className="GoalsList">
            <h2 className="CenterText">For Sunday, 20 May 2023</h2>
            <button className="goals" data-GoalStatus="1" onClick={handleGoalButtonClick}>
              <i className="fas fa-check-circle"></i> Completed: task5
            </button>
            <button className="goals" data-GoalStatus="0" onClick={handleGoalButtonClick}>
              <i className="far fa-circle"></i> To Be Complete: task6
            </button>
          </div>
        </section>
        <section className="AddDelete">
          <Link to="addgoals">
            <img src={addtext} className="AddButton" />
          </Link>
          <a href="Profile.hxtml">
            <img src={deletetext} className="DeleteButton" />
          </a>
        </section>
        <section className="BackHome">
          <a href="Activities.js" className="BackHome">
            &larr; Back
          </a>
        </section>
      </main>
    </body>
  );
}

export default Goals;
