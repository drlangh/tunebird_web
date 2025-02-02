import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const WaitingPage = () => {
  const [gameStatus, setGameStatus] = useState('Esperando jugadores...');

  useEffect(() => {
    const socket = io();

    socket.on('gameStatus', (status) => {
      setGameStatus(status);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Esperando a que el host inicie el juego</h1>
      <p>{gameStatus}</p>
    </div>
  );
};

export default WaitingPage;
