import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../css/Profile.css';
import axios from 'axios';

import Home from "../images/Home.png";
import ProfileBtn from "../images/user.png";
import backBtn from '../images/arrowBack.png'
import reminderBtn from '../images/Reminder.png';
import User from '../images/Profile.png';
import Edit from '../images/Edit.png';

function Profile() {
  const [profileImage, setProfileImage] = useState(User);
  const [username, setUsername] = useState("Username");
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post('http://localhost:3003/profile/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.url;
      setProfileImage(imageUrl);

      const profileResponse = await axios.post('http://localhost:3003/profile/update', {
        imageUrl,
      });

      console.log(profileResponse);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUsernameClick = () => {
    setIsEditingUsername(true);
  };

  const handleUsernameBlur = async () => {
    setIsEditingUsername(false);
    try {
      const response = await axios.post('http://localhost:3003/profilemodel', {
        username,
        image: profileImage,
      });

      console.log(response);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="App">
      <header>
        <div className="Header">

            <button className="btn headerBtn">
              <Link to="/" className='add-link'>
                  <img src={Home} className="img-fluid imgAdjustment" alt="Home Button" />
              </Link>
            </button>

            <p className="headingText">MyFitPlan</p>

            <button className="btn headerBtn">
              <Link to="#" className='add-link'>
                <img src={ProfileBtn} className="img-fluid imgAdjustment" alt="Profile Button"  />
              </Link>
            </button>

          </div>

        <div className="pt-3">
          <div className="row">

            <hr id="line" />

          </div>
        </div>
      </header>

      <section className="user">
        <span
          contentEditable={isEditingUsername}
          suppressContentEditableWarning
          onClick={handleUsernameClick}
          onBlur={handleUsernameBlur}
          onInput={handleUsernameChange}
          style={{ cursor: 'pointer' }}
        >
          {username}
        </span>
        <img id="profile_picture" src={profileImage} />
        <label className="edit_photo">
          <img src={Edit} alt="Edit Photo Icon" />
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <p>Edit</p>
        </label>
      </section>


      <button className="remind_button">
        <img id="reminder_btn" src={reminderBtn} />
        <p>Reminder Settings</p>
      </button>
      <Link to="/" className='add-link p-1'>
      <button className="button_back">
          <img id="icon_back" src={backBtn} />
          <p>Back</p>
      </button>
      </Link>

    </div>
  );
}

export default Profile;
