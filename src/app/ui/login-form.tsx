import { signIn } from '@/auth';
import Spotify from '@public/logos/spotify.svg';

export default function LoginForm() {
  const handleJoinRoom = async () => {
    const response = await fetch('/api/game/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomId: 'room-id-placeholder', playerName: 'player-name-placeholder' }),
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
        <button className="glass-button" onClick={handleJoinRoom}>Join a room</button>
      </div>
    </div>
  );
}
