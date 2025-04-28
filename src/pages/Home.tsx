import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

let keyData = "";
function Home({saveKeyData, prevKey} : {saveKeyData: string, prevKey: string | null}) {
  if (prevKey !== null) {
    keyData = JSON.parse(prevKey);
  }

  const [key, setKey] = useState<string>(keyData); //for api key input
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    // window.location.reload(); // Removed reload as we'll handle state within React
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  return (
    <div className="home-container">
      <div className="quiz-content">
        <h1 className="quiz-title">Career Quiz</h1>
        <p className="quiz-description">
          Please select which type of career quiz you'd like to take below.
        </p>
        
        <div className="quiz-options">
          <div className="quiz-option">
            <Link to="/basic-quiz" className="quiz-button">
              Basic
            </Link>
            <p className="option-description">
              Seven short and simple questions to give a generic direction towards possible career areas
            </p>
          </div>
          
          <div className="quiz-option">
            <Link to="/detailed-quiz" className="quiz-button">
              Detailed
            </Link>
            <p className="option-description">
              Ten detailed and specific questions to receive more precise careers and education advice
            </p>
          </div>
        </div>
      </div>
      <Form className="api-key-form">
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

export default Home; 