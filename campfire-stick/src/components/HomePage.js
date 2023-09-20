// src/components/HomePage.js
import React from 'react';
import './HomePage.css'; // Import the CSS file for styling
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import { Link } from 'react-router-dom';



function HomePage() {
  return (
    <div className="landing-page">
      <header className="header">
        <h1 className='rye-font redwood-color'>Campfire Stick</h1>
        <p>An Online Comunity Storytelling Website</p>
      </header>
      <section className="features">
        <Link to="/#/campfire-stick/history">
          <div className="feature">
            <div className="feature-image">
              <img src={image1} alt="Feature 1" />
            </div>
            <p></p>
            <h2>Come Close & Listen</h2>
            <p>Read past stories.</p>
          </div>
        </Link>
        <Link to="/#/campfire-stick/todo">
        <div className="feature">
        <h2>Hold the Campfire Stick</h2>
          <p>Write your part into the story being told.</p>
          <div className="feature-image">
            <img src={image2} alt="Feature 2" />
          </div>
        </div>
        </Link>
        <Link to="/#/campfire-stick/about">
          <div className="feature">
            <div className="feature-image">
              <img src={image3} alt="Feature 3" />
            </div>
            <p></p>
            <h2>Look Around</h2>
            <p>Learn more about this website.</p>
          </div>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
