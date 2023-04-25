import React, { useState } from 'react';
import '../css/AddFood.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import Home from "../images/Home.png";
import Profile from "../images/user.png";

function AddFood() {
  //createing variables and variables updaters to use to store data
  const [food, setFood] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [photo, setPhoto] = useState("");
  const [date, setDate] = useState("");

// Function to handle checkbox changes
  const handleCheckbox = (event) => {
    const value = event.target.value;
    //check to see if the checkbox is checked or not
    if (event.target.checked) {
      setSelectedFoods([...selectedFoods, value]);
    } else {
      setSelectedFoods(selectedFoods.filter(food => food !== value));
    }
  }

  //image handler ********TO BE WORKED ON
  const handleFile = (event) => {
    console.log(event.target.files[0]);
  }

//Creating the date format and variables
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentDate= new Date();
const currentDay= new Date();
const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
const formattedDay = currentDay.toLocaleDateString('en-US', { weekday: 'long' });

//When save button is clicked update all the variables with the latest changes
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted data:", {
      food: food,
      notes: notes,
      selectedFoods: selectedFoods,
      photo: photo,
      dateTime: formattedDate,
      dayTime:formattedDay
    });
    //send the variables away to the database
    axios.post('http://localhost:3003/foods', {
      food,
      notes,
      selectedFoods,
      photo,
      dateTime: formattedDate,
      dayTime:formattedDay
    }).then(res => {
      console.log(res.data);
      window.location.reload(); // Refresh the page after successful POST
    }).catch(err => {
      console.error(err);
    });
  }

  
  return (
    <html style={{fontSize: '16px'}} lang="en">
        <body className="" data-lang="en"></body>


        {/* ********* HEADER SECTION*********/}
      <header>
        <div className="Header">
          <button className="btn headerBtn">
            <a href="#">
              <img src={Home} className="img-fluid" alt="Home Button" />
            </a>
          </button>
          <p className="HeaderText">MyFitPlan</p>
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

    {/* ********* First textarea section*********/}
    <div className="box form">
      <section className="text1 textbox">
        <h1>What Did You Eat?</h1>
        <label htmlFor="Food"></label>
        <textarea type="text" id="Food" name="Food" placeholder="Enter text here." onChange={(e) => setFood(e.target.value)}></textarea>
      </section>

    {/* ********* Second textarea section*********/}
      <section className="text2 textbox">
        <h1>Notes</h1>
        <img src="../images/notes.png" alt="" />
        <label htmlFor="Notes"></label>
        <textarea type="text" id="Notes" name="Notes" placeholder="Enter text here." onChange={(e) => setNotes(e.target.value)}></textarea>
      </section>

    {/* ********* Third textarea section*********/}
      <section className="text3 textbox img-fluid">
        <form >
          <input type="checkbox" className="checkbox-round" id="Breakfast" name="Breakfast" value="Breakfast" onChange={(e) => handleCheckbox(e)} />
          <label htmlFor="Breakfast"><img src="../images/breakfast.png" alt="" /> Breakfast</label><br /><br/>
          <input type="checkbox" className="checkbox-round" id="Lunch" name="Lunch" value="Lunch" onChange={(e) => handleCheckbox(e)} />
          <label htmlFor="Lunch"><img src="../images/lunch.png" alt="" /> Lunch</label><br /><br />
          <input type="checkbox" className="checkbox-round" id="Dinner" name="Dinner" value="Dinner" onChange={(e) => handleCheckbox(e)} />
          <label htmlFor="Dinner"><img src="../images/dinner.png" alt="" /> Dinner</label><br /><br />
        </form>
      </section>

      {/* ********* Photo Upload Section*********/}
      <section className="inline">
        <section className="photobox1">
          <h1>Photo:</h1>
        </section>
        <section className="Photo photobox2">
          <input type="file" id="photo" name="photo" accept="image/png, image/jpeg" hidden onChange={(e) => handleFile(e)} />
          <label htmlFor="photo"><img src="../images/camera.png" alt="" /> Upload image</label>
        </section>
      
      {/* ********* Save And Upload Section*********/}
      <button className="save textbox" onClick={handleSubmit}>
          <Link to="/food">
          <img src="../images/save.png" />
          <label >Save Item</label>          
          </Link>
      </button>

    {/* ********* Back Section*********/}
      <Link to="/food" className="back-link">
          <button className="back-button textbox">
          <img src="../images/back-arrow.png" /> 
          <span className="back-label">Back</span>          
          </button>
      </Link>
      </section>
      </div>
      </html>
    );
}
export default AddFood;