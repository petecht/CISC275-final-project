import React, { useState } from 'react';
import '../styles/Quiz.css';

interface QuestionAnswer {
  questionId: number;
  answer: string;
}

function BasicQuiz() {
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 7;

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
    alert('Thank you for completing the quiz! Your results would be processed here.');
  };

  return (
    <div className="quiz-container fade-in">
      <h1>Basic Career Quiz</h1>
      <p>Answer these simple questions to get career recommendations.</p>
      
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
        <div className="step-text">{currentStep} of {totalSteps}</div>
      </div>
      
      {currentStep === 1 && (
        <div className="question-container">
          <p><b>Question 1: </b>Do you prefer working with people or working alone?</p>
          <div className="options">
            <button 
              className={getOptionClass(1, 'With people')} 
              onClick={() => handleOptionSelect(1, 'With people')}
            >
              With people
            </button>
            <button 
              className={getOptionClass(1, 'Alone')} 
              onClick={() => handleOptionSelect(1, 'Alone')}
            >
              Alone
            </button>
            <button 
              className={getOptionClass(1, 'Both equally')} 
              onClick={() => handleOptionSelect(1, 'Both equally')}
            >
              Both equally
            </button>
          </div>
        </div>
      )}
      
      {currentStep === 2 && (
        <div className="question-container">
          <p><b>Question 2: </b>Are you more interested in creative or analytical work?</p>
          <div className="options">
            <button 
              className={getOptionClass(2, 'Creative')}
              onClick={() => handleOptionSelect(2, 'Creative')}
            >
              Creative
            </button>
            <button 
              className={getOptionClass(2, 'Analytical')}
              onClick={() => handleOptionSelect(2, 'Analytical')}
            >
              Analytical
            </button>
            <button 
              className={getOptionClass(2, 'Both equally')}
              onClick={() => handleOptionSelect(2, 'Both equally')}
            >
              Both equally
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="question-container">
          <p><b>Question 3: </b>How do you prefer to solve problems?</p>
          <div className="options">
            <button 
              className={getOptionClass(3, 'Following established procedures')}
              onClick={() => handleOptionSelect(3, 'Following established procedures')}
            >
              Following established procedures
            </button>
            <button 
              className={getOptionClass(3, 'Creating innovative solutions')}
              onClick={() => handleOptionSelect(3, 'Creating innovative solutions')}
            >
              Creating innovative solutions
            </button>
            <button 
              className={getOptionClass(3, 'A mix of both approaches')}
              onClick={() => handleOptionSelect(3, 'A mix of both approaches')}
            >
              A mix of both approaches
            </button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="question-container">
          <p><b>Question 4: </b>Which work environment do you prefer?</p>
          <div className="options">
            <button 
              className={getOptionClass(4, 'Fast-paced and dynamic')}
              onClick={() => handleOptionSelect(4, 'Fast-paced and dynamic')}
            >
              Fast-paced and dynamic
            </button>
            <button 
              className={getOptionClass(4, 'Structured and predictable')}
              onClick={() => handleOptionSelect(4, 'Structured and predictable')}
            >
              Structured and predictable
            </button>
            <button 
              className={getOptionClass(4, 'Balanced with some variety')}
              onClick={() => handleOptionSelect(4, 'Balanced with some variety')}
            >
              Balanced with some variety
            </button>
          </div>
        </div>
      )}

      {currentStep === 5 && (
        <div className="question-container">
          <p><b>Question 5: </b>How important is work-life balance to you?</p>
          <div className="options">
            <button 
              className={getOptionClass(5, 'Very important')}
              onClick={() => handleOptionSelect(5, 'Very important')}
            >
              Very important
            </button>
            <button 
              className={getOptionClass(5, 'Somewhat important')}
              onClick={() => handleOptionSelect(5, 'Somewhat important')}
            >
              Somewhat important
            </button>
            <button 
              className={getOptionClass(5, 'I prioritize career advancement')}
              onClick={() => handleOptionSelect(5, 'I prioritize career advancement')}
            >
              I prioritize career advancement
            </button>
          </div>
        </div>
      )}

      {currentStep === 6 && (
        <div className="question-container">
          <p><b>Question 6: </b>Do you prefer leading others or executing tasks yourself?</p>
          <div className="options">
            <button 
              className={getOptionClass(6, 'Leading others')}
              onClick={() => handleOptionSelect(6, 'Leading others')}
            >
              Leading others
            </button>
            <button 
              className={getOptionClass(6, 'Executing tasks myself')}
              onClick={() => handleOptionSelect(6, 'Executing tasks myself')}
            >
              Executing tasks myself
            </button>
            <button 
              className={getOptionClass(6, 'Both depending on the situation')}
              onClick={() => handleOptionSelect(6, 'Both depending on the situation')}
            >
              Both depending on the situation
            </button>
          </div>
        </div>
      )}

      {currentStep === 7 && (
        <div className="question-container">
          <p><b>Question 7: </b>Which type of recognition motivates you most?</p>
          <div className="options">
            <button 
              className={getOptionClass(7, 'Financial rewards')}
              onClick={() => handleOptionSelect(7, 'Financial rewards')}
            >
              Financial rewards
            </button>
            <button 
              className={getOptionClass(7, 'Public acknowledgment')}
              onClick={() => handleOptionSelect(7, 'Public acknowledgment')}
            >
              Public acknowledgment
            </button>
            <button 
              className={getOptionClass(7, 'Personal sense of achievement')}
              onClick={() => handleOptionSelect(7, 'Personal sense of achievement')}
            >
              Personal sense of achievement
            </button>
          </div>
        </div>
      )}
      
      <div className="quiz-navigation">
        {currentStep > 1 && (
          <button className="nav-button prev-button" onClick={handlePrevious}>Previous</button>
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

export default BasicQuiz; 