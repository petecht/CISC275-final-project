import React from 'react';
import '../styles/Quiz.css';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
  }

function ResultSection({displayResults, results}: {displayResults: boolean, results: ChatMessage[]}) {
    return (
        <div>
            {displayResults && 
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    {results.map((msg, i) => (
                    <div key={i}><strong>{msg.role}:</strong> {msg.content}</div>
                    ))}
                </div>
            }
        </div>
    );
}

export default ResultSection; 