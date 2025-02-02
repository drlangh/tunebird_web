import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Scoreboard from '@/app/components/Scoreboard';

const ScoreboardPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchScoreboard = async () => {
      try {
        const response = await fetch(`/api/game/${id}/scoreboard`);
        const data = await response.json();
        setPlayers(data.players);
      } catch (error) {
        console.error('Failed to fetch scoreboard:', error);
      }
    };

    fetchScoreboard();
  }, [id]);

  const handlePlayAgain = () => {
    router.push('/game/create');
  };

  return (
    <div>
      <h1>Final Scoreboard</h1>
      <Scoreboard players={players} onPlayAgain={handlePlayAgain} />
    </div>
  );
};

export default ScoreboardPage;
