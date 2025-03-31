import React from 'react';
import '../styles/Quiz.css';

function BasicQuiz() {
  return (
    <div className="quiz-container">
      <h1>Basic Career Quiz</h1>
      <p>Answer these simple questions to get career recommendations.</p>
      
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

      <div className="question-container">
      <h3>Question 3:</h3>
      <p>How do you prefer to solve problems?</p>
      <div className="options">
        <button className="option-button">Following established procedures</button>
        <button className="option-button">Creating innovative solutions</button>
        <button className="option-button">A mix of both approaches</button>
      </div>
    </div>

    <div className="question-container">
      <h3>Question 4:</h3>
      <p>Which work environment do you prefer?</p>
      <div className="options">
        <button className="option-button">Fast-paced and dynamic</button>
        <button className="option-button">Structured and predictable</button>
        <button className="option-button">Balanced with some variety</button>
      </div>
    </div>

    <div className="question-container">
      <h3>Question 5:</h3>
      <p>How important is work-life balance to you?</p>
      <div className="options">
        <button className="option-button">Very important</button>
        <button className="option-button">Somewhat important</button>
        <button className="option-button">I prioritize career advancement</button>
      </div>
    </div>

    <div className="question-container">
      <h3>Question 6:</h3>
      <p>Do you prefer leading others or executing tasks yourself?</p>
      <div className="options">
        <button className="option-button">Leading others</button>
        <button className="option-button">Executing tasks myself</button>
        <button className="option-button">Both depending on the situation</button>
      </div>
    </div>

    <div className="question-container">
      <h3>Question 7:</h3>
      <p>Which type of recognition motivates you most?</p>
      <div className="options">
        <button className="option-button">Financial rewards</button>
        <button className="option-button">Public acknowledgment</button>
        <button className="option-button">Personal sense of achievement</button>
      </div>
    </div>
      
      <button className="submit-button">Submit Answers</button>
    </div>
  );
}

export default BasicQuiz; 