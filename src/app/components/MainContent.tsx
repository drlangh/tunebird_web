import React, { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const MainContent = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setContent({
        playlistName: 'My Playlist',
        albums: [
          { title: 'Album 1', artist: 'Artist 1' },
          { title: 'Album 2', artist: 'Artist 2' },
          { title: 'Album 3', artist: 'Artist 3' },
        ],
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h1 className="text-3xl font-bold text-white">How are you feeling today?</h1>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-gray-400"
          placeholder="Type something..."
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white"
        >
          Submit
        </button>
      </form>
      {loading && (
        <div className="flex flex-col items-center space-y-2">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-white" />
          <p className="text-white">Loading...</p>
        </div>
      )}
      {content && (
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-2xl font-bold text-white">{content.playlistName}</h2>
          <ul className="space-y-1">
            {content.albums.map((album, index) => (
              <li key={index} className="text-white">
                {album.title} - {album.artist}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MainContent;
