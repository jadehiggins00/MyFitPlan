import logo from './logo.svg';
import './css/App.css';
import './css/General.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"

import Food from "./components/Food"
import FoodItem from "./components/FoodItem"
import AddFood from "./components/AddFood"
import DeleteFood from "./components/deleteFoods"


import LeftArrow from './images/LeftArrow.png';

import 'bootstrap/dist/css/bootstrap.min.css';
//import { Activities } from './backend/models/activitiesModel';


function App() {

  return(
    <div className="App">
  {/* routes from for the home page */}
    <Routes>
      <Route path="/" element={ <Home/> } />

      <Route path="food" element={ <Food/> } />
      <Route path="fooditem" element={<FoodItem/>}/>
      <Route path="DeleteFood" element={ <DeleteFood/> } />
      <Route path="addfood" element={ <AddFood/> } />
    </Routes>
  </div>
  );
 
}//end app



export default App;
