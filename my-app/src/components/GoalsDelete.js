import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/GeneralGoals.css';
import '../css/GoalsDelete.css';
import { Link } from "react-router-dom";
import Home from '../images/Home.png';
import Profile from '../images/Profile.png';
import 'bootstrap/dist/css/bootstrap.min.css';


function GoalsDelete() {

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

  const deleteGoal = (tid) => {
    axios.delete(`http://localhost:3003/goalsmodel/${tid}`)
      .then(response => {
        console.log(response.data);
        window.location.href = '/goals';
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
      let button_icon = goal_status === "1" ? 'Completed' : 'To be complete';
      let button_text = `${button_icon}: ${goal_text}`;
      let button_element = `<button class="${button_class}" data-GoalStatus="${goal_status}" data-GoalId="${taskID}">${button_text}</button>`;
      
      // Push the button element to the goals list array
      goals_list.push(button_element);
    }
  
    
    // Add click event listeners to buttons
    setTimeout(function() {
        let buttons = document.querySelectorAll('.goals');
        let pickedButtonId;
        let taskText;
      
        buttons.forEach((button) => {
      
            //add listeners
            button.addEventListener('click', () => {
            const taskId = button.getAttribute("data-GoalId");
            

            if (pickedButtonId !== taskId) {
                // unmark previously picked button
                if (pickedButtonId) {
                  let pickedButton = document.querySelector(`[data-GoalId="${pickedButtonId}"]`);
                  pickedButton.innerHTML = pickedButton.innerHTML.replace('<i class="fa fa-close"></i>', '');
                  pickedButton.style.background = '#D6D7D9';
                }
              
                // mark current button as picked
                button.innerHTML = '<i class="fa fa-close"></i>' + button.innerHTML.replace('<i class="fa fa-close"></i>', '');
                button.style.background = '#FFB4B4';
                pickedButtonId = taskId;
                taskText = button.innerHTML.split(": ")[1];
                //console.log("selecting" + taskText);
            }
          });
        });

        const confirmButton = document.querySelector('.confirm');
        confirmButton.addEventListener('click', () => {
            if (pickedButtonId) {
                //console.log("deeletin" + taskText);
                deleteGoal(pickedButtonId);
            }
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
        <h2>Pick a goal to delete</h2>
        <section className="container">
        {generateGoalsList()}
        </section>

        <div className="BottomGoalsAddButtons">
            <Link to="/goals" className="back">&larr; Back</Link>
            <button type="submit" className="confirm">&#10003; Confirm</button>
          </div>
      </main>
    </body>
  );
}

export default GoalsDelete;


        //let goalS = button.getAttribute("data-GoalStatus");
        // let goalT = button.getAttribute("data-GoalId");
        // console.log("task: " + goalT + "stat: " + goalS);
        // // if (goalS === "1") {
        // //   console.log("this is true block" + "task: " + goalT + "stat: " + goalS);
        // //   button.style.backgroundColor = "#94BFA2";
        // // } else {
        // //   console.log("this is false block" + "task: " + goalT + "stat: " + goalS);
        // //   button.style.backgroundColor = "#D6D7D9";
          
        // // }
