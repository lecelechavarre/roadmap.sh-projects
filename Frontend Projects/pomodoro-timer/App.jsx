import React, { useEffect, useCallback } from 'react';
import { Timer } from './components/Timer/Timer';
import { Controls } from './components/Controls/Controls';
import { Settings } from './components/Settings/Settings';
import { SessionInfo } from './components/SessionInfo/SessionInfo';
import { Progress } from './components/Progress/Progress';
import { useTimerContext } from './context/TimerContext';
import { useTimer } from './hooks/useTimer';
import { useAudio } from './hooks/useAudio';
import styles from './App.module.css';

function App() {
  const { 
    settings, 
    currentSession, 
    completedSessions, 
    nextSession,
    resetSession 
  } = useTimerContext();
  
  const { play, AudioComponent } = useAudio('/sounds/bell.mp3');

  const getCurrentDuration = useCallback(() => {
    switch (currentSession) {
      case 'work':
        return settings.workDuration;
      case 'shortBreak':
        return settings.shortBreakDuration;
      case 'longBreak':
        return settings.longBreakDuration;
      default:
        return settings.workDuration;
    }
  }, [currentSession, settings]);

  const handleSessionComplete = useCallback(() => {
    play();
    nextSession();
  }, [play, nextSession]);

  const {
    timeLeft,
    isRunning,
    start,
    pause,
    reset
  } = useTimer(getCurrentDuration(), handleSessionComplete);

  // Reset timer when session changes
  useEffect(() => {
    reset();
  }, [currentSession, reset]);

  const getSessionLabel = useCallback(() => {
    switch (currentSession) {
      case 'work':
        return 'Work Session';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return '';
    }
  }, [currentSession]);

  const calculateProgress = useCallback(() => {
    const total = getCurrentDuration();
    if (total === 0) return 0;
    const elapsed = total - timeLeft;
    return (elapsed / total) * 100;
  }, [timeLeft, getCurrentDuration]);

  const handleReset = useCallback(() => {
    reset();
    resetSession();
  }, [reset, resetSession]);

  return (
    <div className={styles.app}>
      <AudioComponent />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Pomodoro Timer</h1>
        </header>

        <SessionInfo 
          sessionType={getSessionLabel()}
          completedSessions={completedSessions}
        />

        <Progress progress={calculateProgress()} />

        <Timer 
          timeLeft={timeLeft}
          sessionType={getSessionLabel()}
        />

        <Controls 
          isRunning={isRunning}
          onStart={start}
          onPause={pause}
          onReset={handleReset}
        />

        <Settings />

        <footer className={styles.footer}>
          <p>Stay focused, get things done! ✨</p>
        </footer>
      </div>
    </div>
  );
}

export default App;