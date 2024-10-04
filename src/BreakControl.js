import React from 'react';

const BreakControl = ({ breakTime, setBreakTime, min, max, interval }) => {
	const handleIncrement = () => {
		if (breakTime < max) setBreakTime(breakTime + interval);
	};

	const handleDecrement = () => {
		if (breakTime > min) setBreakTime(breakTime - interval);
	};

	return (
		<div id="break-control">
			<h2 id="break-label">Break Length</h2>
			<button id="break-decrement" onClick={handleDecrement}>-</button>
			<span id="break-length">{Math.floor(breakTime / 60)}</span>
			<button id="break-increment" onClick={handleIncrement}>+</button>
		</div>
	);
};

export default BreakControl;
