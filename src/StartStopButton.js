import React from 'react';

const StartStopButton = ({ onStartStop, isRunning }) => (
	<button id="start_stop" onClick={onStartStop}>
		{isRunning ? 'Stop' : 'Start'}
	</button>
);

export default StartStopButton;
