import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const location = useLocation();
  
  const isActiveLink = (path: string) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-link">CareerQuiz</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className={isActiveLink('/')}>Home</Link>
        <Link to="/basic-quiz" className={isActiveLink('/basic-quiz')}>Basic Quiz</Link>
        <Link to="/detailed-quiz" className={isActiveLink('/detailed-quiz')}>Detailed Quiz</Link>
      </div>
      <div className="auth-section">
        <span className="auth-link">Login/Sign up</span>
        <div className="profile-icon-placeholder">👤</div>
      </div>
    </nav>
  );
}

export default Navbar; 