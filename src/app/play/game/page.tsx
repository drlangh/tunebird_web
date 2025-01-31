'use client';

import React, { useState } from 'react';

const GameModeSelection = () => {
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [rounds, setRounds] = useState<number>(1);
  const [theme, setTheme] = useState<string>('');

  const handleModeChange = (mode: string) => {
    setSelectedModes((prevModes) =>
      prevModes.includes(mode)
        ? prevModes.filter((m) => m !== mode)
        : [...prevModes, mode]
    );
  };

  const handleStartGame = () => {
    // Logic to start the game
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 gradient-background">
      <h1 className="text-2xl font-bold mb-4">Select Game Mode</h1>
      <div className="flex flex-col items-start mb-4">
        <label>
          <input
            type="checkbox"
            value="Timeline"
            onChange={() => handleModeChange('Timeline')}
          />
          Timeline
        </label>
        <label>
          <input
            type="checkbox"
            value="Guess That Snippet"
            onChange={() => handleModeChange('Guess That Snippet')}
          />
          Guess That Snippet
        </label>
        <label>
          <input
            type="checkbox"
            value="Lyrics Fill"
            onChange={() => handleModeChange('Lyrics Fill')}
          />
          Lyrics Fill
        </label>
        <label>
          <input
            type="checkbox"
            value="Karaoke Score"
            onChange={() => handleModeChange('Karaoke Score')}
          />
          Karaoke Score
        </label>
      </div>
      <div className="flex flex-col items-start mb-4">
        <label>
          Number of Rounds:
          <input
            type="number"
            value={rounds}
            onChange={(e) => setRounds(Number(e.target.value))}
            min="1"
          />
        </label>
      </div>
      <div className="flex flex-col items-start mb-4">
        <label>
          Theme:
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
        </label>
      </div>
      <button className="main-button" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default GameModeSelection;
