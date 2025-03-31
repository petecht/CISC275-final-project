import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BasicQuiz from './pages/BasicQuiz';
import DetailedQuiz from './pages/DetailedQuiz';
import { Form, Button } from 'react-bootstrap';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  const [isKeySubmitted, setIsKeySubmitted] = useState<boolean>(prevKey !== null);
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    setIsKeySubmitted(true);
    // window.location.reload(); // Removed reload as we'll handle state within React
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  // If key is not submitted yet, show the API key input form
  if (!isKeySubmitted) {
    return (
      <div className="api-key-container">
        <h1>Career Quiz Application</h1>
        <p>Please enter your API key to continue</p>
        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br></br>
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
        <div className="team-info">
          <p>Ryan Koller</p>
          <p>Peter Chapman</p>
          <p>Shaurya Kumar</p>
          <p>Paul Edelman</p>
        </div>
      </div>
    );
  }

  // Main application with routing
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basic-quiz" element={<BasicQuiz />} />
            <Route path="/detailed-quiz" element={<DetailedQuiz />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

// Added name: "Ryan Koller" (3/18/25)