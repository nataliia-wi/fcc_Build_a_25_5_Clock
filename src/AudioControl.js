import React from 'react';
import BeepSound from './sound/BeepSound.mp3'


const AudioControl = () => (
	<audio id="beep" src={BeepSound} preload="auto" />
);

export default AudioControl;
