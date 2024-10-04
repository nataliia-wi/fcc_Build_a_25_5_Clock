import './App.css';
import { useState, useEffect } from 'react';
import BreakControl from './BreakControl';
import SessionControl from './SessionControl';
import TimerDisplay from './TimerDisplay';
import StartStopButton from './StartStopButton';
import ResetButton from './ResetButton';
import AudioControl from './AudioControl';

const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const defaultDisplayText = "Session";
const min = 60;
const max = 60 * 60;
const interval = 60;

function App() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [sessionLength, setSessionLength] = useState(defaultSessionTime);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState(defaultDisplayText);

  let timerId;
  const handleReset = () => {
    clearInterval(timerId);
    setIsRunning(false);
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setSessionLength(defaultSessionTime)
    setCurrentSession(defaultDisplayText);
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
  };
  const handleStartStop = () => {
    setIsRunning((prevState) => {
      console.log(prevState)
      return !prevState
    }); // Перемикає стан таймера
  };

  // Використання useEffect для запуску таймера
  useEffect(() => {

    if (isRunning && sessionTime > 0) {
      // Якщо таймер активний і час більше 0, запускаємо інтервал
      setIsRunning(true);
      timerId = setInterval(() => {
        setSessionTime((prevState) => {
          if (prevState > 0) {
            console.log(prevState);
            return prevState - 1;
          }
        });
      }, 1000); // Інтервал в 1 секунду
    } else if (!isRunning) {
      clearInterval(timerId); // Якщо таймер не активний, очищуємо інтервал
      setIsRunning(false);
    }

    return () => clearInterval(timerId); // Очищаємо інтервал при зміні стану або завершенні компонента
  }, [isRunning, sessionTime]

  );

  useEffect(() => {
    if (sessionTime === 0) {
      document.getElementById('beep').play()
      setTimeout(() => {
        if (currentSession === defaultDisplayText) {
          setCurrentSession('Break');
          setSessionTime(breakTime);
          console.log(currentSession);
          // Запускаємо перерву з часу breakTime
        }
        else {
          setCurrentSession(defaultDisplayText);
          setSessionTime(sessionLength); // Після завершення перерви починаємо сесію
          console.log(currentSession);
        }
      }, 2000)
    }
  }, [currentSession, breakTime, sessionTime, sessionLength, defaultDisplayText]);

  return (
    <div className="App">
      <h1>Pomodoro Clock</h1>
      <div className="setters">
        <BreakControl breakTime={breakTime} setBreakTime={setBreakTime} min={min} max={max} interval={interval} />
        <SessionControl sessionTime={sessionTime} setSessionTime={setSessionTime} min={min} max={max} interval={interval} sessionLength={sessionLength} setSessionLength={setSessionLength} />
      </div>
      <TimerDisplay displayState={sessionTime} currentSession={currentSession} />
      <StartStopButton onStartStop={handleStartStop} isRunning={isRunning} />
      <ResetButton onReset={handleReset} />
      <AudioControl />
    </div>
  );
}

export default App;
