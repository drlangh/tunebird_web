import React from 'react';

interface Player {
  id: string;
  name: string;
  score: number;
}

interface ScoreboardProps {
  players: Player[];
  onPlayAgain: () => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ players, onPlayAgain }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div>
      <h2>Final Scoreboard</h2>
      <ul>
        {sortedPlayers.map((player) => (
          <li key={player.id}>
            {player.name}: {player.score}
          </li>
        ))}
      </ul>
      <button onClick={onPlayAgain}>Play Again</button>
    </div>
  );
};

export default Scoreboard;
