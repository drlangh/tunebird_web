import { signOut } from '@/auth';
import UserAvatar from '../components/session/UserAvatar';

export default function Play() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg">
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>

      <UserAvatar />
      <h1 className="text-4xl font-bold">Play</h1>
    </div>
  );
}
