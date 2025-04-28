import React from 'react';
import '../styles/Quiz.css';
import { useQuiz } from '../components/useQuiz';
import ResultSection from './Results';
import CareerReport from './CareerReport';
import BasicCareerReport from './BasicCareerReport';

function Quiz({quizType, questions, options, description}: {quizType: string, questions: string[], options: string[][], description: string}) {
  const {
    answers,
    currentStep,
    results,
    totalSteps,
    handleOptionSelect,
    isOptionSelected,
    getOptionClass,
    handleNext,
    handlePrevious,
    handleSubmit,
    careerReport,
    basicCareerReport,
    isLoading
  } = useQuiz(questions.length, quizType);

  const renderQuestion = () => {
    const idx = currentStep - 1;
    return (
      <div className="question-container">
        <p><b>Question {currentStep}: </b>{questions[idx]}</p>
        <div className="options">
          {options[idx].map(option => (
            <button
              key={option}
              className={getOptionClass(currentStep, option)}
              onClick={() => handleOptionSelect(currentStep, option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Determine if we should show the report section
  const showReport = isLoading || careerReport || basicCareerReport;

  return (
    <div className="quiz-container fade-in">
      <h1>{quizType} Career Quiz</h1>
      <p>{description}</p>

      {!showReport && (
        <>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
            <div className="step-text">{currentStep} of {totalSteps}</div>
          </div>

          {renderQuestion()}

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
                Generate Career Report
              </button>
            )}
          </div>
        </>
      )}

      {isLoading && quizType === 'Detailed' && (
        <CareerReport report={null} isLoading={true} />
      )}

      {isLoading && quizType === 'Basic' && (
        <BasicCareerReport report={null} isLoading={true} />
      )}

      {careerReport && quizType === 'Detailed' && (
        <CareerReport report={careerReport} isLoading={false} />
      )}

      {basicCareerReport && quizType === 'Basic' && (
        <BasicCareerReport report={basicCareerReport} isLoading={false} />
      )}

      {results.length > 0 && !showReport && (
        <ResultSection displayResults={true} results={results} />
      )}
    </div>
  );
}

export default Quiz;