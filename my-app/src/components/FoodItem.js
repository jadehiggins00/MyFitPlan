import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/General.css';
// import '../css/Food.css';
import "../css/Activities.css";
import { Link, useHistory} from "react-router-dom";
import Home from "../images/Home.png";
import Profile from "../images/user.png";
import { Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function FoodItem() {
  // get the selected food ID from the location state
  const location = useLocation();
  const selectedFoodId = location.state.selectedFoodId;
  // set up state to store the list of foods and the current index
  const [ foods, setFoods] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // use an effect hook to fetch the list of foods from the server
  useEffect(() => {
      axios.get(`http://localhost:3003/foods`)
      .then(response => {
        const foodsData = response.data.foods;
        setFoods(foodsData);
    })
    .catch(error => {
        console.log(error);
    });
    }, []);

    // Select the food item with the given ID and log it
    const selectedFood = foods.find(food => food._id === selectedFoodId);
    // Filter the food items by the current date
    const filteredFoods = selectedFood ? [selectedFood] : [];
    // Filter the food items by the current date
    const displayDay = foods.filter(food => food.dateTime === foods[currentIndex].dateTime);

    return (
      <div>
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

            {/* ********* DATE SECTION *********/}

      <section className="Date" id="">
        <div className="container-fluid p-4">
            <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center text-center">
                <div className="flex-fill h2-custom">
                {foods.length > 0 && (
                    <div>
                      <p>{foods[currentIndex].dayTime} {foods[currentIndex].dateTime}</p>
                    </div>
                )}
                </div>
            </div>
            </div>
        </div>
      </section>

      {/* ********* FOOD LIST  *********/}
      <section>
      <div>
      {/* Displays the list of food items within each day */}
      <div>
        {filteredFoods.map(food => (
        <div  key={filteredFoods._id}>
        <div className="box2">
      <section className="text1 textbox">
        <h1>What You Eat</h1>
        <label htmlFor="Food"></label>
        <textarea type="text" id="Food" name="Food" placeholder={food.food} ></textarea>
      </section>
      <section>
      <div className="col-md-6 p-4 container-fluid pl-1" style={{maxWidth: '900px'}}>
          {food.meals.includes('Breakfast') && <img src="../images/breakfast.png" alt="Breakfast image" />}
          {food.meals.includes("Lunch") && <img src="../images/lunch.png" alt="Lunch image" />}
          {food.meals.includes("Dinner") && <img src="../images/dinner.png" alt="Dinner image" />}
      </div>
      </section>
      <section className="text2 textbox">
        <h1>Notes</h1>
        <img src="../images/notes.png" alt="" />
        <label htmlFor="Notes"></label>
        <textarea type="text" id="Notes" name="Notes" placeholder={food.notes} ></textarea>
      </section>
      </div>
      </div>))}
      </div>
    </div>
</section>

    {/* ********* Back Button Section*********/}
    <Link to="/food" className="back-link">
        <button className="back-button">
        <img src="../images/back-arrow.png" /> 
        <span className="back-label">Back</span>          
        </button>
    </Link>
</div>);}
    
export default FoodItem;