import React from 'react';

const TimerDisplay = ({ displayState, currentSession }) => {
  const formatTime = (time) => {
    if (time <= 0) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div id="timer-display">
      <h2 id="timer-label">{currentSession}</h2>
      <div id="time-left">{formatTime(displayState)}</div>
    </div>
  );
};

export default TimerDisplay;
