import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import PreviousBtn from "../images/prev.png";
import NextBtn from "../images/next.png";
import CheckMark from "../images/check.png";
import Home from "../images/Home.png";
import Profile from "../images/user.png";
import Remove from "../images/remove.png";
import Add from "../images/plus.png";
import "../css/DeleteActivity.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function DeleteFood() {

    // grabbing the foods object
    const [ foods, setfoods] = useState([]);
    // keeping track of the currently display food items
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedFoods, setselectedFoods] = useState([]);

//Left arrow handler to circle through the days
    const handleLeftButtonClick = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      };
//Right arrow handler to circle through the days
    const handleRightButtonClick = () => {
    if (currentIndex < foods.length - 1) {
        setCurrentIndex(currentIndex + 1);
    }
    };

    //Function to delete the selected food items by its id
    function deleteFood(foodId) {
        console.log(foodId);
        setselectedFoods(prevselectedFoods =>
          prevselectedFoods.includes(foodId)
            ? prevselectedFoods.filter(id => id !== foodId)
            : [...prevselectedFoods, foodId]
        );
    }
    //Function to delete multiple selected items
    function deleteselectedFoods() {
      console.log(selectedFoods);
      //Go through the chosen collection and delete the elements which were selected
        selectedFoods.forEach(foodId => {
          axios.delete(`http://localhost:3003/foods/${foodId}`)
            .then(response => {
              console.log(`Food item ${foodId} deleted successfully`);
              // update the foods page
              setfoods(prevfoods =>
                prevfoods.filter(food => food._id !== foodId)
              );
            })
            //catching errors
            .catch(error => {
              console.error(`Error deleting activity ${foodId}:`, error);
            });
        });
        setselectedFoods([]);
      }

      // axios function to get the list of foods from the db
    useEffect(() => {
      axios.get('http://localhost:3003/foods')
      .then(response => {
          const foodsData = response.data.foods;
          setfoods(foodsData);
      })
      //catching erros
      .catch(error => {
          console.log(error);
      });
      }, []);
    
    // Filter the foods by the current date
    const filteredfoods = foods.filter(food => food.dateTime === foods[currentIndex].dateTime);
    // Filter the foods by the current date
    const displayDay = foods.filter(food => food.dayTime === foods[currentIndex].dayTime);

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
                <div className="d-flex align-items-center mr-auto">
                <button  className="btn btn-primary btn-custom ml-5"  onClick={handleLeftButtonClick}>
                    <img src={PreviousBtn} alt="Button 1" className="mr-2" />
                </button>
                </div>
                <div className="flex-fill h2-custom">
                {foods.length > 0 && (
                    <div>
                          <p>{foods[currentIndex].dayTime}</p>
                        <p>{foods[currentIndex].dateTime}</p>
                    </div>
                )}
                </div>
                <div className="d-flex align-items-center ml-auto">
                <button className="btn btn-primary btn-custom mr-5" onClick={handleRightButtonClick}>
                    <img src={NextBtn} alt="Button 2" className="mr-2" />
                </button>
                </div>
            </div>
            </div>
        </div>
        </section>

      {/* ********* FOOD LIST  *********/}
  <section>
  <div>
  {/* Displays the list of foods within each day */}
  <h1>Select foods to Delete </h1>
  <div className="row">
    {filteredfoods.map(food => (
      <div className="col-sm-12 mb-1" key={food._id}>
         {/* change button colour when selected */}
         <button id="activity-button" onClick={() => deleteFood(food._id)} 
                className={` 
                ${selectedFoods.includes(food._id) ? 'selectedColour' : ''}`}>  
          <div className="d-flex align-items-center p-3">
                {/* add remove image when selected */}
                {selectedFoods.includes(food._id) ? 
                                <img src={Remove} alt="Selected"/> :''}
            <div className="flex-grow-1">
              <div className="row align-items-center">
                <div className="col-md-4 mr-2">
                            {food.meals.includes('Breakfast') && <img src="../images/breakfast.png" alt="Breakfast image" />}
                            {food.meals.includes("Lunch") && <img src="../images/lunch.png" alt="Lunch image" />}
                            {food.meals.includes("Dinner") && <img src="../images/dinner.png" alt="Dinner image" />}
                </div>
                <div className="col-md-8 ml-2 text-center ">
                  <h4 className="h4-food  " style={{ fontSize: "4em" }}>{food.food}</h4>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    ))}
  </div>
</div>
</section>

<div>
    {/* Confirm Button to delete the selected items*/}
    <Link to="/food">
    <button className="btn btn-success" onClick={deleteselectedFoods}>
        <img src={CheckMark} className="img-fluid" alt="check mark image" id="checkMarkImage"/>
        <h2>Confirm</h2>
        </button>
    </Link>

    {/* Back Button*/}
    <Link to="/food" className="back-link">
        <button className="back-button btn btn-success">
        <img src="../images/back-arrow.png" /> 
        <span className="back-label">Back</span>          
        </button>
    </Link>
</div>
    </div>
);}

export default DeleteFood