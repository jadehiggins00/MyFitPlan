import logo from './logo.svg';
import './css/App.css';
import './css/General.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"

import DeleteActivities from "./components/DeleteActivities"
import Goals from "./components/Goals"


import GoalsAdd from "./components/GoalsAdd"
import GoalsDelete from "./components/GoalsDelete"

import LeftArrow from './images/LeftArrow.png';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return(
    <div className="App">
  {/* routes from for the home page */}
    <Routes>
      <Route path="/" element={ <Home/> } />

      <Route path="goals" element={ <Goals/> } />

      <Route path="goals/addgoals" element={ <GoalsAdd/> } />
      <Route path="goals/deletegoals" element={ <GoalsDelete/> } />
      <Route path="activities/deleteactivities" element={ <DeleteActivities/> } />

    </Routes>
  </div>
  );
 
}//end app



export default App;
