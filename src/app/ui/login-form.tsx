import { signIn } from '@/auth';
import Spotify from '@public/logos/spotify.svg';
import Link from 'next/link';

export default function LoginForm() {
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

      <Link href={'#'} className="text-lg w-full">
        <button className="glass-button">Join a room</button>
      </Link>
    </div>
  );
}
