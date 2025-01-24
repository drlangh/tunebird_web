import { auth } from '@/auth';
import MainContent from '../components/MainContent';
import SpotifyPlayer from '../ui/spotify-player';

import type SessionJWT from '@/types/session';

export default async function Play() {
  const session = (await auth()) as SessionJWT;

  if (!session) {
    return null;
  }

  const provider = session.token.provider;

  return (
    <>
      <MainContent />

      {provider === 'spotify' && (
        <SpotifyPlayer token={session.token.access_token} />
      )}
    </>
  );
}
