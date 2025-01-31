import React from 'react';
import TimelineMode from '@/app/components/game/TimelineMode';
import GuessThatSnippet from '@/app/components/game/GuessThatSnippet';
import LyricsFill from '@/app/components/game/LyricsFill';
import KaraokeScore from '@/app/components/game/KaraokeScore';
import SecretMissions from '@/app/components/game/SecretMissions';
import Scoreboard from '@/app/components/game/Scoreboard';

const GamePage = () => {
  return (
    <div className="game-page">
      <h1 className="text-2xl font-bold mb-4">Game</h1>
      <div className="game-modes">
        <TimelineMode />
        <GuessThatSnippet />
        <LyricsFill />
        <KaraokeScore />
      </div>
      <SecretMissions />
      <Scoreboard />
    </div>
  );
};

export default GamePage;
