'use client';

import React, { useEffect, useState } from 'react';

const TimelineMode = () => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      const response = await fetch('/api/snippets');
      const data = await response.json();
      setSnippets(data);
    };

    fetchSnippets();
  }, []);

  const handleDrop = (id, position) => {
    setSnippets((prevSnippets) =>
      prevSnippets.map((snippet) =>
        snippet.id === id ? { ...snippet, position } : snippet
      )
    );
  };

  const handleConfirm = () => {
    console.log('Confirmed positions:', snippets);
  };

  return (
    <div className="timeline-mode">
      <h2 className="text-xl font-bold mb-4">Timeline Mode</h2>
      <div className="snippets">
        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className="snippet"
            draggable
            onDragEnd={(e) => handleDrop(snippet.id, e.clientX)}
          >
            {snippet.title}
          </div>
        ))}
      </div>
      <button className="main-button mt-4" onClick={handleConfirm}>
        Confirm Position
      </button>
    </div>
  );
};

export default TimelineMode;
