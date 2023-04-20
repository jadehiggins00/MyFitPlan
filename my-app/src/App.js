import logo from './logo.svg';
import './css/App.css';
import './css/General.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Activities from "./components/Activities"
import Goals from "./components/Goals"
import Sleep from "./components/Sleep"
import AddActivities from "./components/AddActivities"

import LeftArrow from './images/LeftArrow.png';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return(
    <div className="App">
  {/* routes from for the home page */}
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="activities" element={ <Activities/> } />
      <Route path="goals" element={ <Goals/> } />
      <Route path="activities/addactivities" element={ <AddActivities/> } />
      <Route path="sleep" element={ <Sleep/> } />
    </Routes>
  </div>
  );
 
}//end app



export default App;
