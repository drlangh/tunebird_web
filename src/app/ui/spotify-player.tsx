'use client';

import { PropsWithChildren } from 'react';
import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk';
import Player from '../components/SpotifyPlayer';

interface SpotifyPlayerProps extends PropsWithChildren {
  token: string;
}

const SpotifyPlayer = ({ token }: SpotifyPlayerProps) => {
  return (
    <WebPlaybackSDK
      initialDeviceName="Tunebird"
      getOAuthToken={(cb) => {
        cb(token);
      }}
    >
      <Player token={token} />
    </WebPlaybackSDK>
  );
};

export default SpotifyPlayer;
