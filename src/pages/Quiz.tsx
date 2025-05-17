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
    getOptionClass,
    handleNext,
    handlePrevious,
    handleSubmit,
    careerReport,
    basicCareerReport,
    isLoading
  } = useQuiz(questions.length, quizType);

  const handleReturn = () => {
    // Reset the quiz state by reloading the page
    window.location.reload();
  };

  //renders current question and its options
  const renderQuestion = () => {
    const idx = currentStep - 1;
    return (
      //dynamically renders options for each question
      <div className="question-container">
        <p><b>Question {currentStep}: </b>{questions[idx]}</p>
        <div className="options">
          {options[idx].map(option => (
            <button
              key={option}
              className={getOptionClass(currentStep, option)}
              onClick={() => handleOptionSelect(currentStep, option)} //records responses
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
    //displays quiz heading and description
    <div className="quiz-container fade-in">
      <h1>{quizType} Career Quiz</h1>
      <p>{description}</p>

      {!showReport && (
        <>
        {/*progress bar for visual notification to user */}
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
            <div className="step-text">{currentStep} of {totalSteps}</div>
          </div>

          {renderQuestion()}
        {/* quiz navigation settings */}
          <div className="quiz-navigation">
            {currentStep > 1 && (
              <button className="nav-button prev-button" onClick={handlePrevious}>Previous</button>
            )}
            {currentStep < totalSteps ? (
              <button
                className="nav-button next-button"
                onClick={handleNext} //disables next until current question is answered
                disabled={!answers.some(a => a.questionId === currentStep)}
              >
                Next
              </button>
            ) : (
              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={answers.length < totalSteps} //show report only after last question
              >
                Generate Career Report
              </button>
            )}
          </div>
        </>
      )}

      {/* report conidtions for both reports */}
      {isLoading && quizType === 'Detailed' && (
        <CareerReport report={null} isLoading={true} onReturn={handleReturn} />
      )}

      {isLoading && quizType === 'Basic' && (
        <BasicCareerReport report={null} isLoading={true} onReturn={handleReturn} />
      )}

      {careerReport && quizType === 'Detailed' && (
        <CareerReport report={careerReport} isLoading={false} onReturn={handleReturn} />
      )}

      {basicCareerReport && quizType === 'Basic' && (
        <BasicCareerReport report={basicCareerReport} isLoading={false} onReturn={handleReturn} />
      )}

      {/* show results messages if everything else fails */}
      {results.length > 0 && !showReport && (
        <ResultSection displayResults={true} results={results} />
      )}
    </div>
  );
}

export default Quiz;