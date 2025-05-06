import React from 'react';
import Form from 'react-bootstrap/Form';
import '../styles/Footer.css';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

let keyData = "";
function Footer({saveKeyData, prevKey} : {saveKeyData: string, prevKey: string | null}) {
    const [enterAPIKey, setEnterAPIKey] = useState<boolean>(prevKey === null);
    if (prevKey !== null) {
        keyData = JSON.parse(prevKey);
    }

    const [key, setKey] = useState<string>(keyData); //for api key input
    
    //sets the local storage item to the api key the user inputed
    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        setEnterAPIKey(false);
        window.alert("Your API key was submitted!");
    }
    function handleEnterAPIKey() {
        setEnterAPIKey(!enterAPIKey);
    }

    //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
    function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
        setKey(event.target.value);
    }
  return (
    <div className='footer'>
        { enterAPIKey && <Form className="api-key-form">
            <Form.Label>API Key:</Form.Label>
            <Form.Control className='control' type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
            <br></br>
            <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form> }
      <div className="team-info">
            <Button className='enter-api-key-button' onClick={handleEnterAPIKey}>Change API Key</Button>
            <div className='names'>
              <p>Ryan Koller</p>
              <p>Peter Chapman</p>
              <p>Shaurya Kumar</p>
              <p>Paul Edelman</p>
            </div>
      </div>
    </div>
  );
}

export default Footer; 