import React from 'react';

interface StartGameButtonProps {
  isHost: boolean;
  onStartGame: () => void;
}

const StartGameButton: React.FC<StartGameButtonProps> = ({ isHost, onStartGame }) => {
  return (
    <button
      onClick={onStartGame}
      disabled={!isHost}
      style={{
        backgroundColor: isHost ? 'blue' : 'gray',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: isHost ? 'pointer' : 'not-allowed',
      }}
    >
      Start Game
    </button>
  );
};

export default StartGameButton;
