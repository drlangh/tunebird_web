'use client';

import React, { useState, useEffect } from 'react';

const GuessThatSnippet = () => {
  const [snippet, setSnippet] = useState({
    id: 1,
    title: '',
    artist: '',
    options: ['Option 1', 'Option 2', 'Option 3'],
    correctOption: 'Option 1',
  });
  const [selectedOption, setSelectedOption] = useState('');
  const [freeResponse, setFreeResponse] = useState('');

  useEffect(() => {
    const fetchSnippet = async () => {
      const response = await fetch('/api/snippet');
      const data = await response.json();
      setSnippet(data);
    };

    fetchSnippet();
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFreeResponseChange = (e) => {
    setFreeResponse(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Selected option:', selectedOption);
    console.log('Free response:', freeResponse);
  };

  return (
    <div className="guess-that-snippet">
      <h2 className="text-xl font-bold mb-4">Guess That Snippet</h2>
      <div className="snippet-player">
        <p>Snippet Player Placeholder</p>
      </div>
      <div className="options mt-4">
        {snippet.options.map((option, index) => (
          <div key={index} className="option">
            <input
              type="radio"
              id={`option-${index}`}
              name="snippet-option"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
      </div>
      <div className="free-response mt-4">
        <input
          type="text"
          placeholder="Enter your response"
          value={freeResponse}
          onChange={handleFreeResponseChange}
        />
      </div>
      <button className="main-button mt-4" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default GuessThatSnippet;
