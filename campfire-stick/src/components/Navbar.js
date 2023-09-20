// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
  return (
    <nav className="rye-font">
      <ul>
          <li>
            <Link to="/campfire-stick/">
              <div>Home</div>
            </Link>
          </li>
          <li>
            <Link to="/campfire-stick-history">
              <div>History</div>
            </Link>
          </li>
          <li>
            <Link to="/campfire-stick-todo">
              <div>Story</div>
            </Link>
          </li>
          <li>
            <Link to="/campfire-stick-about">
              <div>About</div>
            </Link>
          </li>

      </ul>
    </nav>
  );
}

export default Navbar;
