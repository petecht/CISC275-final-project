import React, { useState } from 'react';
import { BasicCareerReport as BasicCareerReportType } from '../components/useQuiz';
import '../styles/BasicCareerReport.css';

//interface for the basic career report
interface BasicCareerReportProps {
  report: BasicCareerReportType | null;
  isLoading: boolean;
  onReturn?: () => void;
}

const BasicCareerReport: React.FC<BasicCareerReportProps> = ({ report, isLoading, onReturn }) => {
  const [expandedCareer, setExpandedCareer] = useState<number | null>(null);

  //loading spinner while report is generated
  if (isLoading) {
    return (
      <div className="basic-report-loading">
        <div className="spinner"></div>
        <p>Generating your career matches...</p>
      </div>
    );
  }
  //nothing is rendered if data is not there
  if (!report) {
    return null;
  }
  //toggles expanded view of the career match
  const toggleCareer = (index: number) => {
    setExpandedCareer(expandedCareer === index ? null : index);
  };

  // Render fit score meter for how well career matches quiz responses
  const renderFitScore = (score: number) => {
    return (
      <div className="fit-score-container">
        <div className="fit-score-label">Match Score: {score}%</div>
        <div className="fit-score-meter">
          <div 
            className="fit-score-fill" 
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="basic-career-report">
      <h2>Your Career Matches</h2> 
      {/* main report heading */}
      <section className="basic-report-section">
        <h3>Top Career Matches</h3> {/* user's top career matches */}
        <div className="basic-careers-container">
          {report.topCareers.map((career, index) => ( //iterates through each top career match
            <div key={index} className="basic-career-card">
              <div 
                className="basic-career-header"  //header toggles visibility of career details
                onClick={() => toggleCareer(index)}
              >
                <h4>{career.title}</h4>
                <span className={`expand-icon ${expandedCareer === index ? 'expanded' : ''}`}>
                  &#9660; {/* displays details only if this card is expanded */}
                </span>
              </div>
              
              {expandedCareer === index && (
                <div className="basic-career-details"> 
                  {renderFitScore(career.fitScore)} {/* match score and description */}
                  
                  <p className="basic-career-description">{career.description}</p>
                  
                  <div className="education-paths">
                    <h5>Education Paths:</h5>
                    <ul> {/* education paths section */}
                      {career.requiredEducation.map((edu, eduIndex) => (
                        <li key={eduIndex}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                  {/* key skills section */}
                  <div className="key-skills">
                    <h5>Key Skills:</h5>
                    <div className="skills-tags">
                      {career.keySkills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* personal strengths section */}
      <div className="insights-container">
        <section className="basic-report-section strengths-section">
          <h3>Your Strengths</h3>
          <ul className="basic-list">
            {report.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </section>
        
        {/* lists work environment traits the user likes */}
        <section className="basic-report-section environment-section">
          <h3>Work Environment Fit</h3>
          <ul className="basic-list">
            {report.workEnvironmentPreferences.map((pref, index) => (
              <li key={index}>{pref}</li>
            ))}
          </ul>
        </section>
      </div>
      {/* suggests learning opportunities for the user */}
      <section className="basic-report-section pathways-section">
        <h3>Recommended Learning Pathways</h3>
        <div className="learning-pathways">
          {report.learningPathways.map((pathway, index) => (
            <div key={index} className="pathway-card">
              <div className="pathway-icon">📚</div>
              <p>{pathway}</p>
            </div>
          ))}
        </div>
      </section>

      {onReturn && ( //returning back to the quiz selection
        <div className="return-button-container">
          <button className="return-button" onClick={onReturn}>
            Return to Quizzes
          </button>
        </div>
      )}
    </div>
  );
};

export default BasicCareerReport; 