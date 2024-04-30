import logo from './logo.svg';
import './css/App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"







function App() {

  return(
    <div className="App">
  {/* routes from for the home page */}
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/about" element={ <About/> } />


    </Routes>
  </div>
  );
 
}//end app



export default App;
