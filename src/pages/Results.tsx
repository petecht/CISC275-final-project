import React from 'react';
import '../styles/Quiz.css';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

function ResultContainer({
    displayResults,
    results,
  }: {
    displayResults: boolean;
    results: ChatMessage[];
  }) {
    const safeResults = Array.isArray(results)
      ? results.filter(
          (msg) =>
            msg &&
            (msg.role === 'user' || msg.role === 'assistant') &&
            typeof msg.content === 'string'
        )
      : [];
  
    return (
      <div>
        {displayResults && (
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {safeResults.length > 0 ? (
              safeResults.map((msg, i) => (
                <div key={i}>
                  <strong>{msg.role}:</strong>{' '}
                  {msg.content || '[No content]'}
                </div>
              ))
            ) : (
              <p>No results to display. Please try again. </p>
            )}
          </div>
        )}
      </div>
    );
  }

export default ResultContainer; 