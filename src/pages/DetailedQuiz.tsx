import React from 'react';
import '../styles/Quiz.css';
import ResultSection from './Results';
import { useState } from 'react';

function DetailedQuiz() {
  const [quizAnswersState, setQuizAnswersState] = useState<string[]>(["", "", "", "", "", "", ""]);

  const setQuizAnswer = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const value = (event.target as HTMLButtonElement).innerHTML;
    setQuizAnswersState(prev =>
      prev.map((item, i) => (i === index ? value : item))
    );
  };

  return (
    <div className="quiz-container">
      <h1>Detailed Career Quiz</h1>
      <p>Answer these more specific questions for precise career recommendations.</p>
      
      {/* Sample quiz questions - you can expand these as needed */}
      <div className="question-container">
        <h3>Question 1:</h3>
        <p>On a scale of 1-5, how much do you enjoy problem-solving activities?</p>
        <div className="options">
          <button className="option-button" onClick={(event) => {setQuizAnswer(1, event)}}>1 (Not at all)</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(1, event)}}>2</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(1, event)}}>3</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(1, event)}}>4</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(1, event)}}>5 (Very much)</button>
        </div>
      </div>
      
      <div className="question-container">
        <h3>Question 2:</h3>
        <p>Which environment do you prefer working in?</p>
        <div className="options">
          <button className="option-button" onClick={(event) => {setQuizAnswer(2, event)}}>Office setting</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(2, event)}}>Outdoors</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(2, event)}}>Laboratory</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(2, event)}}>Remote/home</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(2, event)}}>Various locations</button>
        </div>
      </div>

      <div className="question-container">
        <h3>Question 3:</h3>
        <p>Which of these job roles appeals to you the most?</p>
        <div className="options">
          <button className="option-button" onClick={(event) => {setQuizAnswer(3, event)}}>Leader/Manager</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(3, event)}}>Creative Thinker/Innovator</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(3, event)}}>Specialist/Expert in a field</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(3, event)}}>Supportive/Helping role</button>
        </div>
      </div>

      <div className="question-container">
        <h3>Question 4:</h3>
        <p>How important is job stability to you?</p>
        <div className="options">
          <button className="option-button" onClick={(event) => {setQuizAnswer(4, event)}}>Very important to me</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(4, event)}}>Somewhat important to me</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(4, event)}}>Not a priority</button>
        </div>
      </div>

      <div className="question-container">
        <h3>Question 5:</h3>
        <p>Would you rather work for...</p>
        <div className="options">
          <button className="option-button" onClick={(event) => {setQuizAnswer(5, event)}}>A large corporation</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(5, event)}}>A small business or startup</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(5, event)}}>A nonprofit</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(5, event)}}>Entrepreneur/freelancer</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(5, event)}}>Various locations</button>
        </div>
      </div>

      <div className="question-container">
        <h3>Question 6:</h3>
        <p>What motivates you the most at a job?</p>
        <div className="options">
          <button className="option-button" onClick={(event) => {setQuizAnswer(6, event)}}>High salary and financial success</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(6, event)}}>Passion and purpose</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(6, event)}}>Work-life balance</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(6, event)}}>Opportunities for growth</button>
        </div>
      </div>

      <div className="question-container">
        <h3>Question 7:</h3>
        <p>Do you enjoy learning new skills regularly?</p>
        <div className="options">
          <button className="option-button" onClick={(event) => {setQuizAnswer(7, event)}}>Yes</button>
          <button className="option-button" onClick={(event) => {setQuizAnswer(7, event)}}>No</button>
        </div>
      </div>
      
      <ResultSection answersState={quizAnswersState}></ResultSection>
    </div>
  );
}

export default DetailedQuiz; 
