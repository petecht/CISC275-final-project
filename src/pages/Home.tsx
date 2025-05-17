import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

/* Home page for the website
  This is the default page for the site once the link
  to the site is clicked.
*/

function Home() {
  
  return (
    <div className="home-container">
      <div className="quiz-content">
        <h1 className="quiz-title">Career Quiz</h1>
        <p className="quiz-description">
          {/* description of the career quiz app to the user */}
          CareerQuiz is an app to help you determine what career path you would like to take. 
          Please select which type of career quiz you'd like to take below.
        </p>
        
        <div className="quiz-options">
          <div className="quiz-option">
            {/* Link to the basic quiz */}
            <Link to="/basic-quiz" className="quiz-button">
              Basic
            </Link>
            <p className="option-description">
              {/* Description of the basic career quiz to the user */}
              Seven short and simple questions to give a generic direction towards possible career areas
            </p>
          </div>
          
          <div className="quiz-option">
            {/* Link to the detailed quiz */}
            <Link to="/detailed-quiz" className="quiz-button">
              Detailed
            </Link>
            <p className="option-description">
              {/* Description of the detailed career quiz to the user */}
              Ten detailed and specific questions to receive more precise careers and education advice
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 