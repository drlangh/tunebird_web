import { auth } from '@/auth';
import MainContent from '../components/MainContent';

import type SessionJWT from '@/types/session';
import getSpotifyRecommendations from '../api/ai/getSpotifyRecommendations';

export default async function Play() {
  const session = (await auth()) as SessionJWT;

  if (!session) {
    return null;
  }

  const a = await getSpotifyRecommendations('happy');
  console.log(a);

  return (
    <>
      <MainContent />

      {/* {provider === 'spotify' && (
        <SpotifyPlayer token={session.token.access_token} />
      )} */}
    </>
  );
}
