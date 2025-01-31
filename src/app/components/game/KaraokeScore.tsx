import React, { useState } from 'react';

const KaraokeScore = () => {
  const [lyrics, setLyrics] = useState([
    { id: 1, text: 'I want to hold your hand', highlighted: false },
    { id: 2, text: 'Oh please, say to me', highlighted: false },
    { id: 3, text: 'You\'ll let me be your man', highlighted: false },
  ]);
  const [score, setScore] = useState(0);

  const handleMicrophoneInput = (input) => {
    // Process microphone input and update score
    console.log('Microphone input:', input);
    setScore(score + 10); // Example score update
  };

  return (
    <div className="karaoke-score">
      <h2 className="text-xl font-bold mb-4">Karaoke Score</h2>
      <div className="lyrics-display">
        {lyrics.map((line) => (
          <p key={line.id} className={line.highlighted ? 'highlighted' : ''}>
            {line.text}
          </p>
        ))}
      </div>
      <div className="microphone-input mt-4">
        <p>Microphone Input Placeholder</p>
      </div>
      <div className="score-display mt-4">
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default KaraokeScore;
