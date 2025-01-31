import React, { useState } from 'react';

const TimelineMode = () => {
  const [snippets, setSnippets] = useState([
    { id: 1, title: 'Snippet 1', position: null },
    { id: 2, title: 'Snippet 2', position: null },
    { id: 3, title: 'Snippet 3', position: null },
  ]);

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
