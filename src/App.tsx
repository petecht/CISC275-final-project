import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Footer from './components/Footer'
import AboutUs from './pages/AboutUs';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspec

function App() {

  const basicQuestions: string[] = [
    'Do you prefer working with people or working alone?',
    'Are you more interested in creative or analytical work?',
    'How do you prefer to solve problems?',
    'Which work environment do you prefer?',
    'How important is work-life balance to you?',
    'Do you prefer leading others or executing tasks yourself?',
    'Which type of recognition motivates you most?',
  ];
  const basicOptions: string[][] = [
    ['With people', 'Alone', 'Both equally'],
    ['Creative', 'Analytical', 'Both equally'],
    ['Following established procedures', 'Creating innovative solutions', 'A mix of both approaches'],
    ['Fast-paced and dynamic', 'Structured and predictable', 'Balanced with some variety'],
    ['Very important', 'Somewhat important', 'I prioritize career advancement'],
    ['Leading others', 'Executing tasks myself', 'Both depending on the situation'],
    ['Financial rewards', 'Public acknowledgment', 'Personal sense of achievement'],
  ];
  const basicDescription: string = 'Answer these simple questions to get career recommendations.';

  const detailedQuestions: string[] = [
    'On a scale of 1-5, how much do you enjoy problem-solving activities?',
    'Which environment do you prefer working in?',
    'Which of these job roles appeals to you the most?',
    'How important is job stability to you?',
    'Would you rather work for...',
    'What motivates you the most at a job?',
    'How do you prefer to collaborate?',
    'How do you handle high-pressure situations?',
    'What is your ideal team size?',
    'What kind of training or learning style works best for you?'
  ];
  const detailedOptions: string[][] = [
    ['1 (Not at all)', '2', '3', '4', '5 (Very much)'],
    ['Office setting', 'Outdoors', 'Laboratory', 'Remote/home', 'Various locations'],
    ['Leader/Manager', 'Creative Thinker/Innovator', 'Specialist/Expert in a field', 'Supportive/Helping role'],
    ['Very important to me', 'Somewhat important to me', 'Not a priority'],
    ['A large corporation', 'A small business or startup', 'A nonprofit', 'Entrepreneur/freelancer', 'Government/public sector'],
    ['High salary and financial success', 'Passion and purpose', 'Work-life balance', 'Opportunities for growth'],
    ['In-person brainstorming', 'Solo research and reporting', 'Group project with defined roles', 'Virtual collaboration'],
    ['Stay calm and assess logically', 'Get anxious but push through', 'Thrive under pressure', 'Prefer to avoid it'],
    ['Just me', '2–3 people', '4–6 people', 'More than 6'],
    ['Hands-on learning', 'Visual and media-based', 'Reading and note-taking', 'Discussion and debate']
  ];
  const detailedDescription: string = 'Answer these more specific questions for precise career recommendations.';

  // Main application with routing
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/basic-quiz" element={<Quiz quizType={'Basic'} questions={basicQuestions} options={basicOptions} description={basicDescription}/>} />
            <Route path="/detailed-quiz" element={<Quiz quizType={'Detailed'} questions={detailedQuestions} options={detailedOptions} description={detailedDescription}/>} />
            <Route path="/about-us" element={<AboutUs/>} />
          </Routes>
        </div>
        <Footer saveKeyData={saveKeyData} prevKey={prevKey}/>
      </div>
    </Router>
  );
}

export default App;

// Added name: "Ryan Koller" (3/18/25)