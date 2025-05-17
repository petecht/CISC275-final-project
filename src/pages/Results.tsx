import React from 'react';
import '../styles/Quiz.css';

//TypeScript interface for the message
export interface ChatMessage {
    role: 'user' | 'assistant'; //two possible roles: user and assistant 
    content: string; //chat message content
}

//displaying results of the interaction 
function ResultContainer({displayResults, results}: {displayResults: boolean, results: ChatMessage[]}) {
    return (
        <div>
            {displayResults &&  //only if results are supposed to be shown
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    {results.map((msg, i) => ( //display each chat message
                    <div key={i}><strong>{msg.role}:</strong> {msg.content}</div>
                    ))}
                </div>
            }
        </div>
    );
}

export default ResultContainer; 