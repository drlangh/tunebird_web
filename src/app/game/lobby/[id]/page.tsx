import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';
import GameCode from '@/app/components/GameCode';
import PlayerList from '@/app/components/PlayerList';
import StartGameButton from '@/app/components/StartGameButton';

const LobbyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [gameCode, setGameCode] = useState('');

  useEffect(() => {
    if (!id) return;

    const socket = io();

    socket.emit('joinGame', { gameId: id });

    socket.on('playerJoined', (player) => {
      setPlayers((prevPlayers) => [...prevPlayers, player]);
    });

    socket.on('gameCode', (code) => {
      setGameCode(code);
    });

    socket.on('startGame', () => {
      router.push(`/game/play/${id}`);
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  const handleStartGame = () => {
    const socket = io();
    socket.emit('startGame', { gameId: id });
  };

  return (
    <div>
      <h1>Game Lobby</h1>
      <GameCode code={gameCode} />
      <PlayerList players={players} />
      <StartGameButton isHost={isHost} onStartGame={handleStartGame} />
    </div>
  );
};

export default LobbyPage;
