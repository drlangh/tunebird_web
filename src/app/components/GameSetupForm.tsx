import { useState } from 'react';

export default function GameSetupForm() {
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [numberOfRounds, setNumberOfRounds] = useState(1);
  const [gameMode, setGameMode] = useState('classic');
  const [theme, setTheme] = useState('pop');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hostId: 'host-id-placeholder', // Replace with actual host ID
        numberOfPlayers,
        numberOfRounds,
        gameMode,
        theme,
      }),
    });

    if (response.ok) {
      const game = await response.json();
      console.log('Game created:', game);
      // Redirect to the lobby or game page
    } else {
      console.error('Failed to create game');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Number of Players:
        <input
          type="number"
          value={numberOfPlayers}
          onChange={(e) => setNumberOfPlayers(Number(e.target.value))}
          min="2"
          max="10"
        />
      </label>
      <label>
        Number of Rounds:
        <input
          type="number"
          value={numberOfRounds}
          onChange={(e) => setNumberOfRounds(Number(e.target.value))}
          min="1"
          max="10"
        />
      </label>
      <label>
        Game Mode:
        <select
          value={gameMode}
          onChange={(e) => setGameMode(e.target.value)}
        >
          <option value="classic">Classic</option>
          <option value="timed">Timed</option>
        </select>
      </label>
      <label>
        Theme:
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="jazz">Jazz</option>
        </select>
      </label>
      <button type="submit">Create Game</button>
    </form>
  );
}
