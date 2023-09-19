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
        <h1 className='rye-font redwood-color'>Learn More</h1>
        <p>The story of this website</p>
      </header>
      <section className="about-cont">
          <div className="about-box">
            <p></p>
            <h2>How to Use the Site</h2>
            <p>
                In the current story page of this website people can submit a message of max 256 characters. 
                If there are no messages in the current story you get to start the story off and watch as other people continue it.
            </p>
            <p>
                The idea is we are all sitting around a campfire and who ever gets to hold the stick gets to talk.
                Once there have been 10 messages submitted to the story, it is then archived and stored in the History page where others can see all the stories made here.
            </p>
            
          </div>
          <div className="about-box">
            <h2>Campsite Manners</h2>
            <p>There are no limits to how many messages a user can post. If there is abuse I will set a limit on it.</p>
            <p>Also please keep the content here safe for work.</p>
          </div>
          <div className="about-box">
            <h2>Who Made the Site</h2>
            <p>This site is made by me: Daniel Goresht.  It was made using React for the front end, and Firebase for the back end. Also all images were generated uniquely using AI for this website</p>
            <p>I love creating things and this was an exercise in making a quick webapp that uses a data base.</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
