import { auth } from '@/auth';
import MainContent from '../components/MainContent';
import { useState, useEffect } from 'react';
import { io } from '@/server/socket';

import type SessionJWT from '@/types/session';

export default async function Play() {
  const session = (await auth()) as SessionJWT;
  const [gameState, setGameState] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('gameStateUpdate', (newGameState) => {
      setGameState(newGameState);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCreateRoom = async () => {
    const response = await fetch('/api/game/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ settings: { rounds: 5, mode: 'Guess That Snippet' } }),
    });

    const data = await response.json();
    setRoomId(data.gameRoomId);
  };

  const handleJoinRoom = async () => {
    const response = await fetch('/api/game/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomId, playerName }),
    });

    const data = await response.json();
    setGameState(data.gameRoom);
  };

  const handleStartGame = async () => {
    await fetch('/api/game/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomId }),
    });
  };

  const handleSubmitAnswer = async (answer) => {
    await fetch('/api/game/submit-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomId, playerId: session.token.sub, answer }),
    });
  };

  if (!session) {
    return null;
  }

  return (
    <>
      <MainContent />
      <div>
        <button onClick={handleCreateRoom}>Create Room</button>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Room ID"
        />
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Player Name"
        />
        <button onClick={handleJoinRoom}>Join Room</button>
        <button onClick={handleStartGame}>Start Game</button>
        <button onClick={() => handleSubmitAnswer('example answer')}>Submit Answer</button>
      </div>
    </>
  );
}
