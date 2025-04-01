import React from 'react';
import '../styles/Quiz.css';

function DetailedQuiz() {
  return (
    <div className="quiz-container">
      <h1>Detailed Career Quiz</h1>
      <p>Answer these more specific questions for precise career recommendations.</p>
      
      {/* Sample quiz questions - you can expand these as needed */}
      <div className="question-container">
        <h3>Question 1:</h3>
        <p>On a scale of 1-5, how much do you enjoy problem-solving activities?</p>
        <div className="options">
          <button className="option-button">1 (Not at all)</button>
          <button className="option-button">2</button>
          <button className="option-button">3</button>
          <button className="option-button">4</button>
          <button className="option-button">5 (Very much)</button>
        </div>
      </div>
      
      <div className="question-container">
        <h3>Question 2:</h3>
        <p>Which environment do you prefer working in?</p>
        <div className="options">
          <button className="option-button">Office setting</button>
          <button className="option-button">Outdoors</button>
          <button className="option-button">Laboratory</button>
          <button className="option-button">Remote/home</button>
          <button className="option-button">Various locations</button>
        </div>
      </div>

      <div className="question-container">
        <h3>Question 3:</h3>
        <p>Which of these job roles appeals to you the most?</p>
        <div className="options">
          <button className="option-button">Leader/Manager</button>
          <button className="option-button">Creative Thinker/Innovator</button>
          <button className="option-button">Specialist/Expert in a field</button>
          <button className="option-button">Supportive/Helping role</button>
        </div>
      </div>

      <div className="question-container">
        <h3>Question 4:</h3>
        <p>How important is job stability to you?</p>
        <div className="options">
          <button className="option-button">Very important to me</button>
          <button className="option-button">Somewhat important to me</button>
          <button className="option-button">Not a priority</button>
        </div>
      </div>

      <div className="question-container">
        <h3>Question 5:</h3>
        <p>Would you rather work for...</p>
        <div className="options">
          <button className="option-button">A large corporation</button>
          <button className="option-button">A small business or startup</button>
          <button className="option-button">A nonprofit</button>
          <button className="option-button">Entrepreneur/freelancer</button>
          <button className="option-button">Various locations</button>
        </div>
      </div>

      <div className="question-container">
        <h3>Question 6:</h3>
        <p>What motivates you the most at a job?</p>
        <div className="options">
          <button className="option-button">High salary and financial success</button>
          <button className="option-button">Passion and purpose</button>
          <button className="option-button">Work-life balance</button>
          <button className="option-button">Opportunities for growth</button>
        </div>
      </div>

      <div className="question-container">
        <h3>Question 7:</h3>
        <p>Do you enjoy learning new skills regularly?</p>
        <div className="options">
          <button className="option-button">Yes</button>
          <button className="option-button">No</button>
        </div>
      </div>
      
      <button className="submit-button">Submit Answers</button>
    </div>
  );
}

export default DetailedQuiz; 
