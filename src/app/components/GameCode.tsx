import React from 'react';

interface GameCodeProps {
  code: string;
}

const GameCode: React.FC<GameCodeProps> = ({ code }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert('Game code copied to clipboard!');
  };

  return (
    <div>
      <h2>Game Code</h2>
      <p>{code}</p>
      <button onClick={handleCopy}>Copy Code</button>
    </div>
  );
};

export default GameCode;
