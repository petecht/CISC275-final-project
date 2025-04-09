import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../styles/Quiz.css';

type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
  };

function ResultSection({answersState}: {answersState: string[]}) {
    const [textState, setTextState] = useState<ChatMessage[]>([]);
    const answersText = answersState.join(" | "); // Placeholder until we make a prompt

    const sendMessage = async () => {

        const userMessage: ChatMessage = { role: 'user', content: `Repeat these back to me: ${answersText}` };
        setTextState([...textState, userMessage]);

        try {
        const res = await axios.post('http://localhost:5000/chat', {
            message: `Repeat these back to me: ${answersText}`,
        });

        const botMessage: ChatMessage = { role: 'assistant', content: res.data.reply };
        setTextState(prev => [...prev, botMessage]);
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <div>
            <button onClick={sendMessage} className='submit-button'>Send</button>
            <div style={{ whiteSpace: 'pre-wrap' }}>
                {textState.map((msg, i) => (
                <div key={i}><strong>{msg.role}:</strong> {msg.content}</div>
                ))}
            </div>
        </div>
    );
}

export default ResultSection; 