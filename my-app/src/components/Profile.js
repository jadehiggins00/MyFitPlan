import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../css/General.css';
import '../css/Profile.css';
import Header from './Reusable/Header';
import axios from 'axios';

import backBtn from '../images/arrowBack.png'
import logoutBtn from '../images/LogOut.png';
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
      <Header title="Profile" />

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
      <button className="log_out">
        <img id="log_out_btn" src={logoutBtn} />
        <p>Log Out</p>
      </button>
      <button className="button_back">
          <img id="icon_back" src={backBtn} />
          <p>Back</p>
      </button>

    </div>
  );
}

export default Profile;
