import React from 'react';
import { SpotifyWebPlayback } from 'react-spotify-web-playback-sdk';

const SpotifyPlayer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
      <SpotifyWebPlayback
        token="YOUR_SPOTIFY_ACCESS_TOKEN"
        uris={['spotify:track:4uLU6hMCjMI75M1A2tKUQC']}
        styles={{
          activeColor: '#fff',
          bgColor: '#333',
          color: '#fff',
          loaderColor: '#fff',
          sliderColor: '#1cb954',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
        }}
      />
    </div>
  );
};

export default SpotifyPlayer;
