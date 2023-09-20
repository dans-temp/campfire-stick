// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
  return (
    <nav className="rye-font">
      <ul>
          <li>
            <Link to="/home">
              <div>Home</div>
            </Link>
          </li>
          <li>
            <Link to="/history">
              <div>History</div>
            </Link>
          </li>
          <li>
            <Link to="/story">
              <div>Story</div>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <div>About</div>
            </Link>
          </li>

      </ul>
    </nav>
  );
}

export default Navbar;
