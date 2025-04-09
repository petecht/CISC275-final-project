import React from 'react';
import '../styles/Quiz.css';
import ResultSection from "./Results";
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function BasicQuiz() {
  const [quizAnswersState, setQuizAnswersState] = useState<string[]>(["", "", "", "", "", "", ""]);

  const setQuizAnswer = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const value = (event.target as HTMLButtonElement).innerHTML;
    setQuizAnswersState(prev =>
      prev.map((item, i) => (i === index ? value : item))
    );
  };

  return (
    <div className="quiz-container">
      <h1>Basic Career Quiz</h1>
      <p>Answer these simple questions to get career recommendations.</p>
      
      <div className="question-container">
        <h3>Question 1:</h3>
        <p>Do you prefer working with people or working alone?</p>
        <div className="options">
          <Button className="option-button" onClick={(event) => {setQuizAnswer(1, event)}}>With people</Button>
          <Button className="option-button" onClick={(event) => {setQuizAnswer(1, event)}}>Alone</Button>
          <Button className="option-button" onClick={(event) => {setQuizAnswer(1, event)}}>Both equally</Button>
        </div>
      </div>
      
      <div className="question-container">
        <h3>Question 2:</h3>
        <p>Are you more interested in creative or analytical work?</p>
        <div className="options">
          <Button className="option-button" onClick={(event) => {setQuizAnswer(2, event)}}>Creative</Button>
          <Button className="option-button" onClick={(event) => {setQuizAnswer(2, event)}}>Analytical</Button>
          <Button className="option-button" onClick={(event) => {setQuizAnswer(2, event)}}>Both equally</Button>
        </div>
      </div>

      <div className="question-container">
        <h3>Question 3:</h3>
        <p>How do you prefer to solve problems?</p>
        <div className="options">
          <Button className="option-button" onClick={(event) => {setQuizAnswer(3, event)}}>Following established procedures</Button>
          <Button className="option-button" onClick={(event) => {setQuizAnswer(3, event)}}>Creating innovative solutions</Button>
          <Button className="option-button" onClick={(event) => {setQuizAnswer(3, event)}}>A mix of both approaches</Button>
        </div>
      </div>

      <div className="question-container">
        <h3>Question 4:</h3>
        <p>Which work environment do you prefer?</p>
        <div className="options">
          <Button className="option-button" onClick={(event) => {setQuizAnswer(4, event)}}>Fast-paced and dynamic</Button>
          <Button className="option-button" onClick={(event) => {setQuizAnswer(4, event)}}>Structured and predictable</Button>
          <Button className="option-button" onClick={(event) => {setQuizAnswer(4, event)}}>Balanced with some variety</Button>
        </div>
      </div>

      <div className="question-container">
        <h3>Question 5:</h3>
        <p>How important is work-life balance to you?</p>
        <div className="options">
          <Button className="option-button" onClick={(event) => {setQuizAnswer(5, event)}}>Very important</Button>
          <Button className="option-button" onClick={(event) => {setQuizAnswer(5, event)}}>Somewhat important</Button>
          <Button className="option-button" onClick={(event) => {setQuizAnswer(5, event)}}>I prioritize career advancement</Button>
        </div>
      </div>

      <div className="question-container">
        <h3>Question 6:</h3>
        <p>Do you prefer leading others or executing tasks yourself?</p>
        <div className="options">
          <Button className="option-button" onClick={(event) => {setQuizAnswer(6, event)}}>Leading others</Button>
          <Button className="option-button" onClick={(event) => {setQuizAnswer(6, event)}}>Executing tasks myself</Button>
          <Button className="option-button" onClick={(event) => {setQuizAnswer(6, event)}}>Both depending on the situation</Button>
        </div>
      </div>

      <div className="question-container">
        <h3>Question 7:</h3>
        <p>Which type of recognition motivates you most?</p>
        <div className="options">
          <Button className="option-button" onClick={(event) => {setQuizAnswer(7, event)}}>Financial rewards</Button>
          <Button className="option-button" onClick={(event) => {setQuizAnswer(7, event)}}>Public acknowledgment</Button>
          <Button className="option-button" onClick={(event) => {setQuizAnswer(7, event)}}>Personal sense of achievement</Button>
        </div>
      </div>
      <ResultSection answersState={quizAnswersState}></ResultSection>
    </div>
  );
}

export default BasicQuiz; 