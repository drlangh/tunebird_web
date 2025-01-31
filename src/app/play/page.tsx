import { auth } from '@/auth';
import MainContent from '../components/MainContent';

import type SessionJWT from '@/types/session';

export default async function Play() {
  const session = (await auth()) as SessionJWT;

  if (!session) {
    return null;
  }

  return (
    <>
      <MainContent />

      {/* {provider === 'spotify' && (
        <SpotifyPlayer token={session.token.access_token} />
      )} */}
    </>
  );
}
