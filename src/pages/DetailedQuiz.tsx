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
      
      <button className="submit-button">Submit Answers</button>
    </div>
  );
}

export default DetailedQuiz; 