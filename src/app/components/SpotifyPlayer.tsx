'use client';
import { useEffect, useState } from 'react';
import {
  usePlaybackState,
  useSpotifyPlayer,
} from 'react-spotify-web-playback-sdk';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';
import { FaPlay, FaPause } from 'react-icons/fa';

interface PlayerProps {
  token: string;
}

interface SpotifyDevice {
  id: string;
  name: string;
  is_active: boolean;
}

const track = {
  name: '',
  album: {
    images: [{ url: '' }],
  },
  artists: [{ name: '' }],
};

const Player = ({ token }: PlayerProps) => {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [devices, setDevices] = useState<SpotifyDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const playbackState = usePlaybackState();
  const player = useSpotifyPlayer();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchPlaybackState = async () => {
      try {
        const response = await fetch(
          'https://api.spotify.com/v1/me/player',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.item) {
            setTrack({
              name: data.item.name,
              album: data.item.album,
              artists: data.item.artists,
            });

            setProgress(data.progress_ms);
            setDuration(data.item.duration_ms);
            setPaused(data.is_playing);
          }
        }
      } catch (error) {
        console.error('Error fetching playback state:', error);
      }
    };

    const fetchDevices = async () => {
      try {
        const response = await fetch(
          'https://api.spotify.com/v1/me/player/devices',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setDevices(data.devices);
        }
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    const interval = setInterval(() => {
      if (playbackState) return;

      fetchPlaybackState();
      fetchDevices();
    }, 5000);

    fetchPlaybackState();
    fetchDevices();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (playbackState) {
      setPaused(playbackState.paused);
      setProgress(playbackState.position);
      setDuration(playbackState.duration);

      if (playbackState) {
        setTrack({
          name: playbackState.track_window.current_track.name,
          album: playbackState.track_window.current_track.album,
          artists: playbackState.track_window.current_track.artists,
        });
      }
    }
  }, [playbackState]);

  const handleDeviceChange = async (deviceId: string) => {
    try {
      await fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_ids: [deviceId],
          play: !is_paused,
        }),
      });
      setSelectedDevice(deviceId);
      // setPaused(true);
      // handlePlayPause();
    } catch (error) {
      console.error('Error changing device:', error);
    }
  };

  const previousTrack = async () => {
    if (player) {
      player?.previousTrack();
      return;
    }

    try {
      await fetch('https://api.spotify.com/v1/me/player/previous', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error playing previous track:', error);
    }
  };

  const nextTrack = async () => {
    if (player) {
      player?.nextTrack();
      return;
    }

    try {
      await fetch('https://api.spotify.com/v1/me/player/next', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error playing next track:', error);
    }
  };

  const handlePlayPause = async () => {
    if (player) {
      player.togglePlay();
      return;
    }

    try {
      const endpoint = is_paused
        ? 'https://api.spotify.com/v1/me/player/play'
        : 'https://api.spotify.com/v1/me/player/pause';

      await fetch(endpoint, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPaused(!is_paused);
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const handleSkip = async (direction: 'next' | 'previous') => {
    try {
      await fetch(
        `https://api.spotify.com/v1/me/player/${direction}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error skipping track:', error);
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleProgressClick = async (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const position = Math.floor(duration * percent);

    if (player) {
      player.seek(position);
      return;
    }

    try {
      await fetch('https://api.spotify.com/v1/me/player/seek', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ position_ms: position }),
      });
    } catch (error) {
      console.error('Error seeking:', error);
    }
  };

  if (!current_track) return null;

  return (
    <div className="bottom-0 left-0 right-0 p-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
      <div className="container">
        <div className="flex items-center space-x-4">
          <img
            src={current_track.album.images[0].url}
            alt={current_track.name}
            className="h-16 w-16 rounded-lg"
          />
          <div>
            <h3 className="text-lg font-semibold">
              {current_track.name}
            </h3>
            <p className="text-neutral-400">
              {current_track.artists[0].name}
            </p>
          </div>

          <div className="space-y-2 w-full">
            <div
              className="h-1 bg-neutral-800 rounded-full cursor-pointer relative"
              onClick={handleProgressClick}
            >
              <div
                className="absolute h-full bg-green-500 rounded-full transition-all duration-100"
                style={{ width: `${(progress / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-neutral-400">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            className="text-white/70 hover:text-white transition-colors p-2 text-3xl"
            onClick={previousTrack}
          >
            <BiSkipPrevious />
          </button>

          <button
            className="bg-white rounded-full p-3 hover:scale-105 transition-transform"
            onClick={handlePlayPause}
          >
            {is_paused ? (
              <FaPlay className="text-black text-xl ml-1" />
            ) : (
              <FaPause className="text-black text-xl" />
            )}
          </button>

          <button
            className="text-white/70 hover:text-white transition-colors p-2 text-3xl"
            onClick={nextTrack}
          >
            <BiSkipNext />
          </button>
        </div>

        <div>
          <select
            value={selectedDevice}
            onChange={(e) => handleDeviceChange(e.target.value)}
          >
            <option value="">Select Device</option>
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.name} {device.is_active ? '(Active)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Player;
