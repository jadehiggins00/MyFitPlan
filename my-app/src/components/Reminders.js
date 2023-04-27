import React, { useState, useEffect } from 'react';
import '../css/Reminders.css';
import Home from '../images/Home.png';
import Profile from '../images/user.png';
import backBtn from '../images/arrowBack.png';
import saveBtn from '../images/save-icon.png';

function Reminders() {
  const [reminderOption, setReminderOption] = useState(null);
  const [hasNotificationPermission, setHasNotificationPermission] = useState(false);
  const [isOptionSaved, setIsOptionSaved] = useState(false);
  const [isReminderEnabled, setIsReminderEnabled] = useState(true);

  useEffect(() => {
    requestNotificationPermission();
    const savedReminderOption = localStorage.getItem('reminderOption');
    if (savedReminderOption) {
      setReminderOption(savedReminderOption);
    }
  }, []);
  

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
      return;
    }

    const permission = await Notification.requestPermission();
    setHasNotificationPermission(permission === 'granted');
  };

  const handleOptionChange = (event) => {
    setReminderOption(event.target.value);
  };

  const handleSave = () => {
    if (hasNotificationPermission) {
      const title = 'Reminder';
      const options = {
        body: `You will be reminded ${reminderOption.toLowerCase()}.`,
      };
      new Notification(title, options);
  
      // Save the reminder option to localStorage
      localStorage.setItem('reminderOption', reminderOption);
      setIsOptionSaved(true); 

      setReminder(reminderOption);

      setTimeout(() => {
        setIsOptionSaved(false);
      }, 3000);
    }
  };


  const setReminder = (option) => {
    let interval;
    switch (option) {
      case '1 hour':
        interval = 60 * 60 * 1000;
        break;
      case '2 hour':
        interval = 2 * 60 * 60 * 1000;
        break;
      case '6 hour':
        interval = 6 * 60 * 60 * 1000;
        break;
      case 'Once everyday':
        interval = 24 * 60 * 60 * 1000;
        break;
      default:
        console.error('Invalid reminder option');
        return;
    }
  
    setTimeout(() => {
      const title = 'Reminder';
      const options = {
        body: `This is your reminder, scheduled for every ${option.toLowerCase()}.`,
      };
      new Notification(title, options);
      setReminder(option);
    }, interval);
  };




  const savedMessage = isOptionSaved && isReminderEnabled ? <p>Option saved!</p> : null;


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
            <input type="checkbox" checked={isReminderEnabled} onChange={(e) => setIsReminderEnabled(e.target.checked)}></input>
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
        <input type="radio" id="1 hour" name="option" value="1 hour" onChange={handleOptionChange}checked={reminderOption === '1 hour'} />
        <label htmlFor="1 hour">Every 1 hour</label><br></br><br></br>
        <input type="radio" id="2 hour" name="option" value="2 hour" onChange={handleOptionChange}checked={reminderOption === '2 hour'} />
        <label htmlFor="2 hour">Every 2 hours</label><br></br><br></br>
        <input type="radio" id="6 hour" name="option" value="6 hour" onChange={handleOptionChange}checked={reminderOption === '6 hour'} />
        <label htmlFor="6 hours">Every 6 hours</label><br></br><br></br>
        <input type="radio" id="Once everyday" name="option" value="Once everyday" onChange={handleOptionChange}checked={reminderOption === 'Once everyday'} />
        <label htmlFor="Once Everyday">Once everyday</label><br></br>
        </form><br></br>

        </div>
        <button class="button_save" onClick={handleSave}>
            <img id="icon_save" src={saveBtn} />
            <p>Save</p>
        </button>
        {savedMessage}

        <button class="button_back">
            <img id="icon_back" src={backBtn} />
            <p>Back</p>
        </button>

        </div>
        

  );
}

export default Reminders;
