import React from 'react';
import '../styles/Quiz.css';
import { useQuiz } from '../components/useQuiz';
import ResultSection from './Results';
import CareerReport from './CareerReport';

function Quiz({
  quizType,
  questions,
  options,
  description
}: {
  quizType: string;
  questions: string[];
  options: string[][];
  description: string;
}) {
  const {
    answers,
    currentStep,
    results,
    totalSteps,
    handleOptionSelect,
    getOptionClass,
    handleNext,
    handlePrevious,
    handleSubmit,
    careerReport,
    isLoading
  } = useQuiz(questions.length);

  const isValidIndex = currentStep > 0 && currentStep <= questions.length;
  const questionText = isValidIndex ? questions[currentStep - 1] : '[Invalid question]';
  const questionOptions = isValidIndex ? options[currentStep - 1] : []; 

  const renderQuestion = () => (
    <div className="question-container">
      <p><b>Question {currentStep}: </b>{questionText}</p> {}
      <div className="options">
        {questionOptions.length > 0 ? (
          questionOptions.map(option => (
            <button
              key={option}
              className={getOptionClass(currentStep, option)}
              onClick={() => handleOptionSelect(currentStep, option)}
            >
              {option}
            </button>
          ))
        ) : (
          <p style={{ color: 'red' }}>No options available for this question.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="quiz-container fade-in">
      <h1>{quizType || 'Career'} Quiz</h1> {}
      <p>{description || 'Please answer the following questions.'}</p> {}

      {!careerReport && !isLoading && (
        <>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
            <div className="step-text">{currentStep} of {totalSteps}</div>
          </div>

          {renderQuestion()}

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
                Generate Career Report
              </button>
            )}
          </div>
        </>
      )}

      {(careerReport || isLoading) && (
        <CareerReport report={careerReport} isLoading={isLoading} />
      )}

      {Array.isArray(results) && results.length > 0 && !careerReport && !isLoading && (
        <ResultSection displayResults={true} results={results} />
      )}
    </div>
  );
}

export default Quiz;