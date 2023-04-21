import React from 'react'
import '../css/Reminders.css';
import Home from '../images/Home.png';
import Profile from '../images/user.png';
import backBtn from '../images/arrowBack.png';
import saveBtn from '../images/save-icon.png';

function Reminders() {
    return (
        <div>

        <div>
        <header>
        <div className="Header">

          <button className="btn headerBtn">
            <a href="#">
              <img src={Home} className="img-fluid" alt="Home Button" />
            </a>
          </button>

          <p className="HeaderText">Reminder Settings</p>

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
        </div><br></br>

        
        <div className="containerZ"><br></br>
        <label class="switch">
            <input type="checkbox"></input>
            <span class="slider"></span>
        </label><h2>&nbsp;&nbsp;Reminders on/off</h2>
        </div>

        <div className="pt-4">
          <div className="row">

            <hr id="line" />

          </div>
        </div>

        <br></br>
        <h4>How ofter do you want to be reminded?</h4><br></br>


        <div>
        <form>
        <input type="radio" id="1 hour" name="option" value="1 hour"></input>
        <label for="1 hour">Every 1 hour</label><br></br><br></br>
        <input type="radio" id="2 hour" name="option" value="2 hour"></input>
        <label for="2 hour">Every 2 hours</label><br></br><br></br>
        <input type="radio" id="6 hour" name="option" value="6 hour"></input>
        <label for="6 hours">Every 6 hours</label><br></br><br></br>
        <input type="radio" id="Once everyday" name="option" value="Once everyday"></input>
        <label for="Once Everyday">Once everyday</label><br></br>
        </form><br></br>

        </div>
        <button class="button_save">
            <img id="icon_save" src={saveBtn} />
            <p>Save</p>
        </button>

        <button class="button_back">
            <img id="icon_back" src={backBtn} />
            <p>Back</p>
        </button>

        </div>
        

    )
}

export default Reminders