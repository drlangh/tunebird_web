import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import GameQuestion from '@/app/components/GameQuestion';
import MissionPopup from '@/app/components/MissionPopup';

const PlayPage = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [mission, setMission] = useState('');
  const [isMissionVisible, setIsMissionVisible] = useState(false);

  useEffect(() => {
    const socket = io();

    socket.on('newQuestion', (data) => {
      setQuestion(data.question);
      setOptions(data.options);
    });

    socket.on('newMission', (data) => {
      setMission(data.mission);
      setIsMissionVisible(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAnswer = (answer) => {
    const socket = io();
    socket.emit('submitAnswer', { answer });
  };

  const handleCloseMission = () => {
    setIsMissionVisible(false);
  };

  return (
    <div>
      <h1>Active Game</h1>
      <GameQuestion question={question} options={options} onAnswer={handleAnswer} />
      {isMissionVisible && <MissionPopup mission={mission} onClose={handleCloseMission} />}
    </div>
  );
};

export default PlayPage;
