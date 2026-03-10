import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work');
  const [sessions, setSessions] = useState(0);

  // Format time
  const formatTime = (mins, secs) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer logic
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer complete
            setIsActive(false);
            
            // Play sound
            const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
            audio.play();
            
            // Handle session change
            if (mode === 'work') {
              setSessions(s => s + 1);
              if ((sessions + 1) % 4 === 0) {
                setMode('longBreak');
                setMinutes(15);
              } else {
                setMode('shortBreak');
                setMinutes(5);
              }
            } else {
              setMode('work');
              setMinutes(25);
            }
            setSeconds(0);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode, sessions]);

  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setMinutes(25);
    setSeconds(0);
    setSessions(0);
  };

  // Get mode text
  const getModeText = () => {
    switch(mode) {
      case 'work': return 'Work Time';
      case 'shortBreak': return 'Short Break';
      case 'longBreak': return 'Long Break';
      default: return '';
    }
  };

  return (
    <div className="container">
      <h1 className="title">Pomodoro Timer</h1>
      
      <div className="session-info">
        <h2>{getModeText()}</h2>
        <p>Completed Sessions: {sessions}</p>
      </div>
      
      <div className="timer">
        {formatTime(minutes, seconds)}
      </div>
      
      <div className="controls">
        <button 
          className={`btn ${isActive ? 'btn-pause' : 'btn-start'}`}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="btn btn-reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
      
      <div className="settings">
        <h3>Quick Settings</h3>
        <div className="settings-grid">
          <button className="setting-btn" onClick={() => { setMinutes(25); setSeconds(0); setMode('work'); }}>
            Work (25)
          </button>
          <button className="setting-btn" onClick={() => { setMinutes(5); setSeconds(0); setMode('shortBreak'); }}>
            Short (5)
          </button>
          <button className="setting-btn" onClick={() => { setMinutes(15); setSeconds(0); setMode('longBreak'); }}>
            Long (15)
          </button>
        </div>
      </div>
      
      <footer>
        <p>Stay focused! 🎯</p>
      </footer>
    </div>
  );
}

export default App;