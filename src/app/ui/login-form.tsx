import { signIn } from '@/auth';
import Spotify from '@public/logos/spotify.svg';
import { useState } from 'react';

export default function LoginForm() {
  const [roomId, setRoomId] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handleJoinRoom = async () => {
    const response = await fetch('/api/game/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomId, playerName }),
    });

    const data = await response.json();
    // Handle the response data as needed
  };

  return (
    <div className="flex w-full h-fit py-2 flex-col items-center justify-center gap-4">
      <form
        action={async () => {
          'use server';
          await signIn('spotify', { redirectTo: '/play' });
        }}
        className="w-full"
      >
        <button className="spotify-button">
          <Spotify className="w-6 my-3 mr-3" />
          Continue with Spotify
        </button>
        <p className="mt-2 w-full text-center text-xs opacity-70">
          You need a Spotify Premium account to host a game
        </p>
      </form>

      <div className="w-full">
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Room ID"
          className="glass-input"
        />
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Player Name"
          className="glass-input"
        />
        <button onClick={handleJoinRoom} className="glass-button">
          Join a room
        </button>
      </div>
    </div>
  );
}
