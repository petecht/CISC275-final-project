import React, { useState } from 'react';
import '../styles/Quiz.css';

interface QuestionAnswer {
  questionId: number;
  answer: string;
}

function DetailedQuiz() {
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 10;

  const handleOptionSelect = (questionId: number, answer: string) => {
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === questionId);
    
    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex].answer = answer;
    } else {
      newAnswers.push({ questionId, answer });
    }
    
    setAnswers(newAnswers);
  };

  const isOptionSelected = (questionId: number, answer: string) => {
    return answers.some(a => a.questionId === questionId && a.answer === answer);
  };

  const getOptionClass = (questionId: number, answer: string) => {
    return isOptionSelected(questionId, answer) 
      ? "option-button selected" 
      : "option-button";
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    // Here you would send the answers to the backend or process them
    console.log('Submitted answers:', answers);
    alert('Thank you for completing the detailed quiz! Your results would be processed here.');
  };

  return (
    <div className="quiz-container fade-in">
      <h1>Detailed Career Quiz</h1>
      <p>Answer these more specific questions for precise career recommendations.</p>
      
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
        <div className="step-text">{currentStep} of {totalSteps}</div>
      </div>
      
      {currentStep === 1 && (
        <div className="question-container">
          <p><b>Question 1: </b>On a scale of 1-5, how much do you enjoy problem-solving activities?</p>
          <div className="options">
            {[1, 2, 3, 4, 5].map((value) => (
              <button 
                key={value}
                className={getOptionClass(1, value.toString())}
                onClick={() => handleOptionSelect(1, value.toString())}
              >
                {value === 1 ? `${value} (Not at all)` : value === 5 ? `${value} (Very much)` : value}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {currentStep === 2 && (
        <div className="question-container">
          <p><b>Question 2: </b>Which environment do you prefer working in?</p>
          <div className="options">
            {['Office setting', 'Outdoors', 'Laboratory', 'Remote/home', 'Various locations'].map((option) => (
              <button 
                key={option}
                className={getOptionClass(2, option)}
                onClick={() => handleOptionSelect(2, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="question-container">
          <p><b>Question 3: </b>Which of these job roles appeals to you the most?</p>
          <div className="options">
            {[
              'Leader/Manager', 
              'Creative Thinker/Innovator', 
              'Specialist/Expert in a field', 
              'Supportive/Helping role'
            ].map((option) => (
              <button 
                key={option}
                className={getOptionClass(3, option)}
                onClick={() => handleOptionSelect(3, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="question-container">
          <p><b>Question 4: </b>How important is job stability to you?</p>
          <div className="options">
            {[
              'Very important to me', 
              'Somewhat important to me', 
              'Not a priority'
            ].map((option) => (
              <button 
                key={option}
                className={getOptionClass(4, option)}
                onClick={() => handleOptionSelect(4, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 5 && (
        <div className="question-container">
          <p><b>Question 5: </b>Would you rather work for...</p>
          <div className="options">
            {[
              'A large corporation', 
              'A small business or startup', 
              'A nonprofit', 
              'Entrepreneur/freelancer',
              'Government/public sector'
            ].map((option) => (
              <button 
                key={option}
                className={getOptionClass(5, option)}
                onClick={() => handleOptionSelect(5, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 6 && (
        <div className="question-container">
          <p><b>Question 6: </b>What motivates you the most at a job?</p>
          <div className="options">
            {[
              'High salary and financial success', 
              'Passion and purpose', 
              'Work-life balance', 
              'Opportunities for growth'
            ].map((option) => (
              <button 
                key={option}
                className={getOptionClass(6, option)}
                onClick={() => handleOptionSelect(6, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 7 && (
        <div className="question-container">
          <p><b>Question 7: </b>Do you enjoy learning new skills regularly?</p>
          <div className="options">
            {['Yes', 'No', 'Sometimes'].map((option) => (
              <button 
                key={option}
                className={getOptionClass(7, option)}
                onClick={() => handleOptionSelect(7, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="quiz-navigation">
        {currentStep > 1 && (
          <button className="nav-button prev-button" onClick={handlePrevious}>
            Previous
          </button>
        )}
        
        {currentStep < totalSteps ? (
          <button 
            className="nav-button next-button" 
            onClick={handleNext}
            disabled={!answers.some(a => a.questionId === currentStep)}
          >
            Next
          </button>
        ) : (
          <button 
            className="submit-button"
            onClick={handleSubmit}
            disabled={answers.length < totalSteps}
          >
            Submit Answers
          </button>
        )}
      </div>
    </div>
  );
}

export default DetailedQuiz; 
