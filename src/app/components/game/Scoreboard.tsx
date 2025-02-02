import React from 'react';

const Scoreboard = () => {
  const players = [
    { id: 1, name: 'Player 1', score: 100 },
    { id: 2, name: 'Player 2', score: 80 },
    { id: 3, name: 'Player 3', score: 60 },
  ];

  return (
    <div className="scoreboard">
      <h2 className="text-xl font-bold mb-4">Scoreboard</h2>
      <ul className="ranking">
        {players.map((player) => (
          <li key={player.id} className="player">
            {player.name}: {player.score}
          </li>
        ))}
      </ul>
      <button className="main-button mt-4">Rematch</button>
      <button className="main-button mt-4">Play Another Game</button>
    </div>
  );
};

export default Scoreboard;
