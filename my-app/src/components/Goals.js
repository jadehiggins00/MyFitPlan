import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/GeneralGoals.css';
import '../css/Goals.css';
import { Link } from "react-router-dom";
import Home from '../images/Home.png';
import Profile from '../images/account.png';
import addtext from '../images/addtext.png';
import deletetext from '../images/deletetext.png';
import Delete from "../images/delete (1).png";
import BackBtn from "../images/arrowBack.png";
import Add from "../images/plus.png";
import 'bootstrap/dist/css/bootstrap.min.css';

function Goals() {

  const user = "test"
  localStorage.setItem('username', user);
  const [goals, setGoals] = useState([]);
  const user1 = localStorage.getItem('username');

  
  //console.log(user1)
  useEffect(() => {
    axios.get(`http://localhost:3003/goalsmodel?userName=${user1}`)
      .then(response => {
        console.log(response.data);
        setGoals(response.data);
        console.log("success")
      })
      .catch(error => {
        console.log(error);
      });
  }, [user1]);

  const updateGoalStatus = (taskId, goalStatus) => {
    axios.put(`http://localhost:3003/goalsmodel/${user1}/${taskId}`, { goalStatus })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  

  function generateGoalsList() {
    let current_date = "";
    let goals_list = [];
  
    for (let i = 0; i < goals.length; i++) {
      let goal = goals[i];
      let goal_date = goal.goal_date;
      let goal_text = goal.goal_text;
      let goal_status = goal.goal_status;
      let taskID = goal._id;
  
      // If the date changes, create a new GoalsList div
      if (current_date !== goal_date) {
        // Close the previous GoalsList div
        if (i > 0) {
          goals_list.push("</div>");
        }
        // Start a new GoalsList div for the new date
        goals_list.push(`<div class="GoalsList"><h2 class="CenterText">For ${goal_date}</h2>`);
        current_date = goal_date;
      }
  
      // Create a button element for the task
      let button_class = "goals";
      let button_icon = goal_status === "1" ? '<i class="fas fa-check-circle"></i>Completed' : '<i class="far fa-circle"></i>To be complete';
      let button_text = `${button_icon}: ${goal_text}`;
      let button_element = `<button class="${button_class}" data-GoalStatus="${goal_status}" data-GoalId="${taskID}">${button_text}</button>`;
      
      // Push the button element to the goals list array
      goals_list.push(button_element);
    }
  
    
    // Add click event listeners to buttons
    setTimeout(function() {
      let buttons = document.querySelectorAll('.goals');
  
      buttons.forEach((button) => {

        let goalS = button.getAttribute("data-GoalStatus");
        let goalT = button.getAttribute("data-GoalId");
        console.log("task: " + goalT + "stat: " + goalS);
        if (goalS === "1") {
          console.log("this is true block" + "task: " + goalT + "stat: " + goalS);
          button.style.backgroundColor = "#94BFA2";
        } else {
          console.log("this is false block" + "task: " + goalT + "stat: " + goalS);
          button.style.backgroundColor = "#D6D7D9";
          
        }

        //add listeners
        button.addEventListener('click', () => {
          // console.log(`Your task is ${goal_text}`);
          const goalStatus = button.getAttribute("data-GoalStatus");
          const taskId = button.getAttribute("data-GoalId");
          console.log("before update" + goalStatus)
          const newGoalStatus = goalStatus === "0" ? "1" : "0";
          updateGoalStatus(taskId, newGoalStatus);
          console.log("after update" + goalStatus)
          if (goalStatus === "0") {
            button.setAttribute("data-GoalStatus", "1");
            button.innerHTML = "<i class='fas fa-check-circle'></i>Completed: " + button.innerHTML.split(": ")[1];
            button.style.backgroundColor = "#94BFA2";
          } else {
            button.setAttribute("data-GoalStatus", "0");
            button.innerHTML = "<i class='far fa-circle'></i>To be complete: " + button.innerHTML.split(": ")[1];
            button.style.backgroundColor = "#D6D7D9";
          }
        });
        
  
          
      });
    }, 0);
  
    // Close the last GoalsList div
    if (goals.length > 0) {
      goals_list.push("</div>");
    } else {
      goals_list.push("No goals found for this user.");
    }
    

    return <div dangerouslySetInnerHTML={{ __html: goals_list.join("") }} />;
  }

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
        {generateGoalsList()}
        </section>
        <div className="d-flex justify-content-center flex-column align-items-center">
  <div className="d-flex justify-content-between align-items-center mb-3" id="add-remove-buttons">
    <Link to="addgoals" className='add-link'>
      <img src={Add} className="btn btn-primary btn-add rounded-circle" />
    </Link>
    <Link to="deletegoals" className='add-link'>
      <img src={Delete} className="btn btn-primary btn-remove rounded-circle" />
    </Link>
  </div>
  <div>
    
  </div>
</div>
      </main>
    </body>
  );
}

export default Goals;


  // function addButtonListeners() {
  //   const buttons = document.querySelectorAll('.goals');
  
  //   buttons.forEach((button) => {
  //     let goalS = button.getAttribute("data-GoalStatus");
  //     let goalT = button.getAttribute("data-GoalId");
  //     console.log("task: " + goalT + "stat: " + goalS);
  
  //     if (goalS === "1") {
  //       console.log("this is true block" + "task: " + goalT + "stat: " + goalS);
  //       button.style.backgroundColor = "#94BFA2";
  //     } else {
  //       console.log("this is false block" + "task: " + goalT + "stat: " + goalS);
  //       button.style.backgroundColor = "#D6D7D9";
  //     }
  
  //     //add listeners
  //     button.addEventListener('click', () => 
  //     {
  //       // console.log(`Your task is ${goal_text}`);
  //       const goalStatus = button.getAttribute("data-GoalStatus");
  //       const taskId = button.getAttribute("data-GoalId");
  //       console.log("before update" + goalStatus)
  //       const newGoalStatus = goalStatus === "0" ? "1" : "0";
  //       updateGoalStatus(taskId, newGoalStatus);
  //       console.log("after update" + goalStatus)
  //       if (goalStatus === "0") 
  //       {
  //         button.setAttribute("data-GoalStatus", "1");
  //         button.innerHTML = "<i class='fas fa-check-circle'></i>Completed: " + button.innerHTML.split(": ")[1];
  //         button.style.backgroundColor = "#94BFA2";
  //       } else 
  //       {
  //         button.setAttribute("data-GoalStatus", "0");
  //         button.innerHTML = "<i class='far fa-circle'></i>To be complete: " + button.innerHTML.split(": ")[1];
  //         button.style.backgroundColor = "#D6D7D9";
  //       }
  //     });
  //   });
  // }
  
  
  
  
  
   
  
    
  
   // const handleGoalButtonClick = (event) => {
  //   const button = event.target;
  //   const goalStatus = button.getAttribute("data-GoalStatus");
  //   console.log(goalStatus)
  //   if (goalStatus === "0") {
  //     button.setAttribute("data-GoalStatus", "1");
  //     button.innerHTML =
  //       "<i class='fas fa-check-circle'></i> Completed: " + button.innerHTML.split(": ")[1];
  //     button.style.backgroundColor = "#94BFA2";
  //   } else {
  //     button.setAttribute("data-GoalStatus", "0");
  //     button.innerHTML =
  //       "<i class='far fa-circle'></i> To Be Complete: " + button.innerHTML.split(": ")[1];
  //     button.style.backgroundColor = "#D6D7D9";
  //   }
    
  // };

  // axios.get('http://localhost:3003/goalsmodel')
  // .then(response => {
  //     console.log(response.data);
  //     // Handle the response data here
  // })
  // .catch(error => {
  //     console.log(error);
  // });

  {/* <div className="GoalsList">
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
          </div> */}