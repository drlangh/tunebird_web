import React from 'react';

const MainContent = () => {
  const albums = [
    { title: 'Album 1', artist: 'Artist 1' },
    { title: 'Album 2', artist: 'Artist 2' },
    { title: 'Album 3', artist: 'Artist 3' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Albums</h1>
      <div className="grid grid-cols-3 gap-4">
        {albums.map((album, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{album.title}</h2>
            <p className="text-gray-400">{album.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
