'use client';

import React, { useState, useEffect } from 'react';

const LyricsFill = () => {
  const [lyrics, setLyrics] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchLyrics = async () => {
      const response = await fetch('/api/lyrics');
      const data = await response.json();
      setLyrics(data);
    };

    fetchLyrics();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCheckAnswer = () => {
    console.log('Input value:', inputValue);
  };

  return (
    <div className="lyrics-fill">
      <h2 className="text-xl font-bold mb-4">Lyrics Fill</h2>
      <div className="lyrics">
        {lyrics.map((line) => (
          <span key={line.id} className="line">
            {line.blank ? (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="lyrics-input"
              />
            ) : (
              line.text
            )}
          </span>
        ))}
      </div>
      <button className="main-button mt-4" onClick={handleCheckAnswer}>
        Check Answer
      </button>
    </div>
  );
};

export default LyricsFill;
