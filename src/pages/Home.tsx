import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="quiz-content">
        <h1 className="quiz-title">Career Quiz</h1>
        <p className="quiz-description">
          Please select which type of career quiz you'd like to take below.
        </p>
        
        <div className="quiz-options">
          <div className="quiz-option">
            <Link to="/basic-quiz" className="quiz-button">
              Basic
            </Link>
            <p className="option-description">
              A few short and simple questions to give a generic direction towards possible careers
            </p>
          </div>
          
          <div className="quiz-option">
            <Link to="/detailed-quiz" className="quiz-button">
              Detailed
            </Link>
            <p className="option-description">
              Same short length as the basic quiz, but with more detailed questions to receive more precise results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 