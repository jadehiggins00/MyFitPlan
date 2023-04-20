import React from 'react'
import '../css/GeneralGoals.css';
import '../css/Goals.css';
import { Link } from "react-router-dom";

import Home from '../images/Home.png';
import Profile from '../images/Profile.png';

import addtext from '../images/addtext.png';
import deletetext from '../images/deletetext.png';
function Goals() {
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
              <button className="goals"><i class="fas fa-check-circle"></i> Completed: task1</button>
              <button className="goals"><i class="far fa-circle"></i> To Be Complete: task2</button>
              <button className="goals"><i class="far fa-circle"></i> To Be Complete: task3</button>
              <button className="goals">Walk 20 km in Total</button>
      
            </div>    
      
            <div className="GoalsList">
                <h2 className="CenterText">For Sunday, 2 April 2023</h2>
                <button className="goals">Play Basketball</button>
                <button className="goals">Walk 20 km in Total</button>
                <button className="goals">Walk 20 km in Total</button>
      
            </div>  
            
        
          </section>
        
          <section className="AddDelete">
          <Link to="addgoals"><img src={addtext} className="AddButton"/></Link>
            <a href="Profile.hxtml" ><img src={deletetext} className="DeleteButton"/></a>
          </section>
        
          <section className="BackHome">
            <a href="Activities.js" className="BackHome">&larr; Back</a>
          </section>
        </main>
      </body>
      
    )
}

export default Goals