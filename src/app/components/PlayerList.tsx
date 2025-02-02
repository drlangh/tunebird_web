import React from 'react';

interface Player {
  id: string;
  name: string;
  isHost: boolean;
}

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  return (
    <div>
      <h2>Player List</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id} style={{ fontWeight: player.isHost ? 'bold' : 'normal' }}>
            {player.name} {player.isHost && '(Host)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
