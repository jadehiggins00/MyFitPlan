import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../css/General.css';
import '../css/Profile.css';
import Header from './Reusable/Header';

import backBtn from '../images/arrowBack.png'
import logoutBtn from '../images/LogOut.png';
import reminderBtn from '../images/Reminder.png';
import User from '../images/Profile.png';
import Edit from '../images/Edit.png';


function Profile() {
  return (
    <div className="App">
    <Header title="Profile"/>

  <section class="user">
    <p>Username</p>
    <img id="profile_picture" src={User}/>
    <Link class="edit_photo"><img src={Edit} alt="Edit Photo Icon" /><p>Edit Photo</p></Link>
  </section>
  <div class="buttons">
    <button class="remind_button">
      <img id="reminder_btn" src={reminderBtn} />
      <p>Reminder Settings</p>
    </button>
    <button class="log_out">
      <img id="log_out_btn" src={logoutBtn} />
      <p>Log Out</p>
    </button>
    <button class="button_back">
        <img id="icon_back" src={backBtn} />
        <p>Back</p>
    </button>
  </div>
  </div>
  );
}

export default Profile;