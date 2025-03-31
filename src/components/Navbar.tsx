import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/basic-quiz" className="nav-link">Basic Quiz</Link>
        <Link to="/detailed-quiz" className="nav-link">Detailed Quiz</Link>
      </div>
      <div className="auth-section">
        <span className="auth-link">Login/Sign up</span>
        <div className="profile-icon-placeholder">👤</div>
      </div>
    </nav>
  );
}

export default Navbar; 