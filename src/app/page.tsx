import Tunebird from '@public/logos/tunebird.svg';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between h-full p-6 gradient-background">
      <div className="flex flex-col items-center justify-center w-full h-2/3">
        <Tunebird className="text-white w-4/5" />
        <p className="mt-6 text-center text-lg">
          The game where the music never stops
        </p>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
      <div className="flex flex-col items-center mt-4">
        <Link href="/game">
          <button className="main-button">Select Game Mode</button>
        </Link>
        <Link href="/profile" className="mt-2">
          <button className="main-button">Profile</button>
        </Link>
      </div>
    </main>
  );
}
