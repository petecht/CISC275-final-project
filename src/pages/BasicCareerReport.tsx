import React, { useState } from 'react';
import { BasicCareerReport as BasicCareerReportType } from '../components/useQuiz';
import '../styles/BasicCareerReport.css';

interface BasicCareerReportProps {
  report: BasicCareerReportType | null;
  isLoading: boolean;
  onReturn?: () => void;
}

const BasicCareerReport: React.FC<BasicCareerReportProps> = ({ report, isLoading, onReturn }) => {
  const [expandedCareer, setExpandedCareer] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="basic-report-loading">
        <div className="spinner"></div>
        <p>Generating your career matches...</p>
      </div>
    );
  }

  if (!report) {
    return null;
  }

  const toggleCareer = (index: number) => {
    setExpandedCareer(expandedCareer === index ? null : index);
  };

  // Render fit score meter
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
      
      <section className="basic-report-section">
        <h3>Top Career Matches</h3>
        <div className="basic-careers-container">
          {report.topCareers.map((career, index) => (
            <div key={index} className="basic-career-card">
              <div 
                className="basic-career-header" 
                onClick={() => toggleCareer(index)}
              >
                <h4>{career.title}</h4>
                <span className={`expand-icon ${expandedCareer === index ? 'expanded' : ''}`}>
                  &#9660;
                </span>
              </div>
              
              {expandedCareer === index && (
                <div className="basic-career-details">
                  {renderFitScore(career.fitScore)}
                  
                  <p className="basic-career-description">{career.description}</p>
                  
                  <div className="education-paths">
                    <h5>Education Paths:</h5>
                    <ul>
                      {career.requiredEducation.map((edu, eduIndex) => (
                        <li key={eduIndex}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                  
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
      
      <div className="insights-container">
        <section className="basic-report-section strengths-section">
          <h3>Your Strengths</h3>
          <ul className="basic-list">
            {report.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </section>
        
        <section className="basic-report-section environment-section">
          <h3>Work Environment Fit</h3>
          <ul className="basic-list">
            {report.workEnvironmentPreferences.map((pref, index) => (
              <li key={index}>{pref}</li>
            ))}
          </ul>
        </section>
      </div>
      
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

      {onReturn && (
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