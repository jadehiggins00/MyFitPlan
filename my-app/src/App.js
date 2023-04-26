import logo from './logo.svg';
import './css/App.css';
import './css/General.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"

import DeleteActivities from "./components/DeleteActivities"
import Profile from "./components/Profile"
import Goals from "./components/Goals"
import GoalsAdd from "./components/GoalsAdd"
import GoalsDelete from "./components/GoalsDelete"
import Activities from "./components/Activities"
import AddActivities from "./components/AddActivities"
import Food from "./components/Food"


import LeftArrow from './images/LeftArrow.png';

import 'bootstrap/dist/css/bootstrap.min.css';
//import { Activities } from './backend/models/activitiesModel';


function App() {

  return(
    <div className="App">
  {/* routes from for the home page */}
    <Routes>
      <Route path="/" element={ <Home/> } />
      
      <Route path="profile" element={ <Profile/> } />
      <Route path="goals" element={ <Goals/> } />
      <Route path="activities" element={ <Activities/> } />
      <Route path="foods" element={ <Food/> } />
      
      <Route path="activities/addactivities" element={ <AddActivities/> } />
      <Route path="activities/deleteactivities" element={ <DeleteActivities/> } />
      <Route path="activities/deleteactivities/profile" element={ <Profile/> } />
      <Route path="activities/profile" element={ <Profile/> } />
      <Route path="addactivities/profile" element={ <Profile/> } />
      <Route path="deleteActivities/profile" element={ <Profile/> } />
      <Route path="goals/addgoals" element={ <GoalsAdd/> } />
      <Route path="goals/deletegoals" element={ <GoalsDelete/> } />

    </Routes>
  </div>
  );
 
}//end app



export default App;
