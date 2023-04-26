// src/components/Header.js
import React from 'react';
import { Link } from "react-router-dom";
import HomeBtn from '../../images/Home.png';
import Profile from '../../images/Profile.png';

function Header({ title }) {
  return (
    <header>
      <div className="Header">
        <button className="btn headerBtn">
          <Link to="">
            <img src={HomeBtn} className="img-fluid" alt="Home Button" />
          </Link>
        </button>

        <p className="HeaderText">{title}</p>

        <button className="btn headerBtn">
          <Link to="profile">
            <img src={Profile} className="img-fluid" alt="Profile Button" />
          </Link>
        </button>
      </div>

      <div className="pt-3">
        <div className="row">
          <hr id="line" />
        </div>
      </div>
    </header>
  );
}

export default Header;