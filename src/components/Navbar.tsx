import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import '../styles/Navbar.css';

function DarkModeSwitch(): JSX.Element {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  function updateDarkMode(event: React.ChangeEvent<HTMLInputElement>) {
    setDarkMode(event.target.checked);
  }

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className="dark-mode-container">
      <Form.Label htmlFor="is-dark-mode-check" className="cursor-pointer mb-0">
        Dark Mode?
      </Form.Label>
      <Form.Check
        type="switch"
        id="is-dark-mode-check"
        checked={isDarkMode}
        onChange={updateDarkMode}
        className="switch-pointer m-0"
      />
    </div>
  );
}

function Navbar() {
  const location = useLocation();

  const isActiveLink = (path: string) =>
    location.pathname === path ? 'nav-link active' : 'nav-link';

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
        <DarkModeSwitch />
      </div>
    </nav>
  );
}

export default Navbar;
