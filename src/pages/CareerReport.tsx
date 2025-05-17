import React, { useState } from 'react';
import { CareerReport as CareerReportType } from '../components/useQuiz';
import '../styles/CareerReport.css';

//props interface for the CareerReport component
interface CareerReportProps {
  report: CareerReportType | null;
  isLoading: boolean;
  onReturn?: () => void;
}

const CareerReport: React.FC<CareerReportProps> = ({ report, isLoading, onReturn }) => {
  //using state to track which career and education item to expand on
  const [expandedCareer, setExpandedCareer] = useState<number | null>(null);
  const [expandedEducation, setExpandedEducation] = useState<number | null>(null);

  // the loading icon spins while report is fetched
  if (isLoading) {
    return (
      <div className="career-report-loading">
        <div className="spinner"></div>
        <p>Generating your personalized career report...</p>
      </div>
    );
  }

  //returns nothing if no data is available
  if (!report) {
    return null;
  }

  //toggles expanded state for a given job
  const toggleCareer = (index: number) => {
    setExpandedCareer(expandedCareer === index ? null : index);
  };
  //toggles expanded state for a given academic program
  const toggleEducation = (index: number) => {
    setExpandedEducation(expandedEducation === index ? null : index);
  };

  // Function to render salary bar chart
  const renderSalaryChart = (min: number, max: number, median: number) => {
    const range = max - min;
    const medianPosition = ((median - min) / range) * 100;

    //visual bar chart using CSS styles
    return (
      <div className="salary-chart">
        <div className="chart-title">Salary Range</div>
        <div className="bar-container">
          <div className="bar-chart">
            <div className="bar-fill"></div>
            <div className="median-marker" style={{ left: `${medianPosition}%` }}></div>
          </div>
          <div className="chart-labels">
            <span>${min.toLocaleString()}</span>
            <span>${median.toLocaleString()} (median)</span>
            <span>${max.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  };

  // Function to render job outlook chart
  const renderJobOutlookChart = (growth: string) => {
    let growthPercentage = 0;
    
    // Parse growth rate from the string
    const match = growth.match(/(\d+)/);
    if (match) {
      growthPercentage = parseInt(match[0], 10);
    } else if (growth.includes('high') || growth.includes('strong')) {
      growthPercentage = 85;
    } else if (growth.includes('moderate')) {
      growthPercentage = 50;
    } else if (growth.includes('low') || growth.includes('declining')) {
      growthPercentage = 15;
    } else {
      growthPercentage = 50; // Default if we can't parse
    }

    return (
      <div className="outlook-chart">
        <div className="chart-title">Job Growth Outlook</div>
        <div className="outlook-meter">
          <div className="outlook-fill" style={{ width: `${growthPercentage}%` }}></div>
        </div>
        <div className="outlook-label">{growth}</div>
      </div>
    );
  };

  // Function to render education cost chart
  const renderEducationCostChart = (min: number, max: number, average: number) => {
    const range = max - min;
    const avgPosition = ((average - min) / range) * 100;

    return (
      <div className="cost-chart">
        <div className="chart-title">Education Cost Range</div>
        <div className="bar-container">
          <div className="bar-chart">
            <div className="bar-fill cost-fill"></div>
            <div className="median-marker" style={{ left: `${avgPosition}%` }}></div>
          </div>
          <div className="chart-labels">
            <span>${min.toLocaleString()}</span>
            <span>${average.toLocaleString()} (avg)</span>
            <span>${max.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="career-report">
      <h2>Your Personalized Career Report</h2>
      {/* Section: Recommended Careers */}
      <section className="report-section">
        <h3>Recommended Careers</h3>
        <div className="careers-container">
          {report.careers.map((career, index) => (
            <div key={index} className="career-card">
              {/* Career title with toggleable details */}
              <div 
                className="career-header" 
                onClick={() => toggleCareer(index)}
              >
                <h4>{career.title}</h4>
                <span className={`expand-icon ${expandedCareer === index ? 'expanded' : ''}`}>
                  &#9660;
                </span>
              </div>
              {/* Expanded career details */}
              {expandedCareer === index && (
                <div className="career-details">
                  <p className="career-description">{career.description}</p>
                  {/* Education list */}
                  <div className="required-education">
                    <h5>Required Education:</h5>
                    <ul>
                      {career.requiredEducation.map((edu, eduIndex) => (
                        <li key={eduIndex}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                  {/* Salary chart */}
                  {renderSalaryChart(
                    career.salaryRange.min, 
                    career.salaryRange.max, 
                    career.salaryRange.median
                  )}
                  {/* Job outlook chart */}
                  {renderJobOutlookChart(career.jobOutlook.growth)}
                  {/* Job demand description for the user*/}
                  <div className="job-demand">
                    <h5>Demand:</h5>
                    <p>{career.jobOutlook.demand}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* section about education pathways */}
      <section className="report-section">
        <h3>Education Pathways</h3>
        <div className="education-container">
          {report.educationPaths.map((edu, index) => (
            <div key={index} className="education-card">
              {/* Degree header with toggle */}
              <div 
                className="education-header" 
                onClick={() => toggleEducation(index)}
              >
                <h4>{edu.degree}</h4>
                <span className={`expand-icon ${expandedEducation === index ? 'expanded' : ''}`}>
                  &#9660;
                </span>
              </div>
              {/* Expanded education details */}
              {expandedEducation === index && (
                <div className="education-details">
                  <p className="education-description">{edu.description}</p>
                  
                  {/* the estimated time to complete the given academic program */}
                  <div className="education-time">
                    <h5>Time to Complete:</h5>
                    <p>{edu.timeToComplete}</p>
                  </div>
                  
                  {/* list of institutions for the field of study */}
                  <div className="education-institutions">
                    <h5>Example Institutions:</h5>
                    <ul>
                      {edu.institutions.map((inst, instIndex) => (
                        <li key={instIndex}>{inst}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* render the costs for this academic program */}
                  {renderEducationCostChart(
                    edu.cost.min, 
                    edu.cost.max, 
                    edu.cost.average
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      {/* section on Personality Insights */}
      <section className="report-section">
        <h3>Personality Insights</h3>
        <ul className="insights-list">
          {report.personalityInsights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </section>
      
      {/* section on further recommended resources */}
      <section className="report-section">
        <h3>Recommended Resources</h3>
        <ul className="resources-list">
          {report.recommendedResources.map((resource, index) => (
            <li key={index}>{resource}</li>
          ))}
        </ul>
      </section>

      {/* return to quiz selection phase */}
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

export default CareerReport; 