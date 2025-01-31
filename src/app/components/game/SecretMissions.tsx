'use client';

import React, { useState, useEffect } from 'react';

const SecretMissions = () => {
  const [mission, setMission] = useState({
    id: 1,
    description: 'Collect 2 songs from the 80s',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMission = async () => {
      const response = await fetch('/api/mission');
      const data = await response.json();
      setMission(data);
    };

    fetchMission();
  }, []);

  const handleAcceptMission = () => {
    console.log('Mission accepted:', mission);
    setIsModalOpen(false);
  };

  return (
    <div className="secret-missions">
      <button className="main-button" onClick={() => setIsModalOpen(true)}>
        Show Secret Mission
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-xl font-bold mb-4">Secret Mission</h2>
            <p>{mission.description}</p>
            <button className="main-button mt-4" onClick={handleAcceptMission}>
              Accept Mission
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecretMissions;
