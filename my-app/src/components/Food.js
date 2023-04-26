import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/Activities.css";
import "../css/Food.css";
import { Link} from "react-router-dom";
import Home from "../images/Home.png";
import Profile from "../images/user.png";
import { useNavigate } from 'react-router-dom';
import PreviousBtn from "../images/prev.png";
import NextBtn from "../images/next.png";
import 'bootstrap/dist/css/bootstrap.min.css';


function Food() {
  // grabbing the food items
  const [ foods, setFoods] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checkfoods, setCheckFoods] = useState([]);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const navigate = useNavigate();

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

  //When clicked it will take the id of the selected item and show a page with that item description on it
  const handleActivityClick = (food) => {
    setCheckFoods((prevFoods) => [...prevFoods, food._id]);
    setSelectedFoodId(food._id);
    navigate('/fooditem', { state: { selectedFoodId: food._id } });
  };

    // axios function to get the list of foods from the db
    useEffect(() => {
    axios.get('http://localhost:3003/foods')
    .then(response => {
        const foodsData = response.data.foods;
        setFoods(foodsData);
    })
    .catch(error => {
        console.log(error);
    });
    }, []);

    // Filter the food items by the current date
    const filteredFoods = foods.filter(food => food.dayTime === foods[currentIndex].dayTime);
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
        <div className="container-fluid p-5">
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
                        <h1 className="dayOfWeek">{foods[currentIndex].dayTime}</h1>
                        <h1 className='date'>{foods[currentIndex].dateTime}</h1>
                    </div>
                )}
                </div>
                <div className="d-flex align-items-center ml-auto" >
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
  {/* Displays the list of food items within each day */}
  <h1>Foods </h1>
  <div className="row">
    {filteredFoods.map(food => (
      <div className="col-sm-12 mb-1" key={food._id}>
          <button className={checkfoods.includes(food) ? 'activity-button completed' : 'activity-button'} onClick={() => handleActivityClick(food)}>
            <div className="d-flex align-items-center p-3">
              {checkfoods.includes(food) && <i className="far fa-check-circle"></i>}
              <div className="flex-grow-1">
                <div className="row align-items-center">
                  <div className="col-md-4 mr-2">
                    {food.meals.includes('Breakfast') && <img src="../images/breakfast.png" alt="Breakfast image" />}
                    {food.meals.includes("Lunch") && <img src="../images/lunch.png" alt="Lunch image" />}
                    {food.meals.includes("Dinner") && <img src="../images/dinner.png" alt="Dinner image" />}
                  </div>
                  <div className="col-md-8 ml-2 text-center ">
                    <h4 className="h4-activity" style={{ fontSize: "4em" }}>{food.food}</h4>
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

    {/* Add Button to send the user to the add food page*/}
    <div className="d-flex justify-content-center">
    <div className="d-flex justify-content-between align-items-center">
      <Link to="/addfood" className='add-link'>
          <img src="../images/plus-v2.png" className="btn btn-primary btn-add rounded-circle" />
      </Link>
    </div>

    {/* Delete Button to take the user to the delete page*/}
    <Link to="/DeleteFood" className='add-link'>
      <img src="../images/delete.png" className="btn btn-primary btn-remove rounded-circle" />
    </Link>
    </div>
    {/* Back Button*/}
    <Link to="/" className="back-link">
        <button className="back-button">
        <img src="../images/back-arrow.png" /> 
        <span className="back-label">Back</span>          
        </button>
    </Link>
  </div>
      );}
    export default Food
