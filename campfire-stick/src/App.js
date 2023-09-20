

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Todo from './components/Todo';
import About from './components/About';
import History from './components/History';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/campfire-stick" element={<HomePage />} />
          <Route path="/#/campfire-stick/todo" element={<Todo />} />
          <Route path="/#/campfire-stick/about" element={<About />} />
          <Route path="/#/campfire-stick/history" element={<History />} />
          {/* Add more routes for additional pages */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;