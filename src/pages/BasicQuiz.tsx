import React from 'react';
import '../styles/Quiz.css';

function BasicQuiz() {
  return (
    <div className="quiz-container">
      <h1>Basic Career Quiz</h1>
      <p>Answer these simple questions to get career recommendations.</p>
      
      {/* Sample quiz questions - you can expand these as needed */}
      <div className="question-container">
        <h3>Question 1:</h3>
        <p>Do you prefer working with people or working alone?</p>
        <div className="options">
          <button className="option-button">With people</button>
          <button className="option-button">Alone</button>
          <button className="option-button">Both equally</button>
        </div>
      </div>
      
      <div className="question-container">
        <h3>Question 2:</h3>
        <p>Are you more interested in creative or analytical work?</p>
        <div className="options">
          <button className="option-button">Creative</button>
          <button className="option-button">Analytical</button>
          <button className="option-button">Both equally</button>
        </div>
      </div>
      
      <button className="submit-button">Submit Answers</button>
    </div>
  );
}

export default BasicQuiz; 