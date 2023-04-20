import React from 'react'
import '../css/GeneralGoals.css';
import '../css/Goals.css';
import { Link } from "react-router-dom";



import addtext from '../images/addtext.png';
import deletetext from '../images/deletetext.png';
function Goals() {
    return (
       
      <body className="" data-lang="en">
        <header>
          <div  className="Header">
            <a href="Home.html" >
                <img src="images/Home.png" class="HomeButton" alt=""/>
            </a>
            <p className="HeaderText">Goals</p>
            <a href="Profile.html" ><img src="images/Profile.png" className="ProfileIcon" alt=""/></a>
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