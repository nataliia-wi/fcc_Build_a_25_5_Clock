import React from "react";

const SessionControl = ({ sessionTime, setSessionTime, min, max, interval, sessionLength, setSessionLength }) => {
	const handleIncrement = () => {
		if (sessionTime < max) {
			setSessionTime(sessionTime + interval);
			setSessionLength(sessionLength + interval);
		};
	};

	const handleDecrement = () => {
		if (sessionTime > min) {
			setSessionTime(sessionTime - interval);
			setSessionLength(sessionLength - interval);
		}
	};

	return (
		<div id="session-control">
			<h2 id="session-label">Session Length</h2>
			<button id="session-decrement" onClick={handleDecrement}>-</button>
			<span id="session-length">{Math.floor(sessionLength / 60)}</span>
			<button id="session-increment" onClick={handleIncrement}>+</button>
		</div>
	);
};

export default SessionControl;
