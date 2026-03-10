import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { minutesToSeconds } from '../utils/timeFormatter';

const TimerContext = createContext();

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within TimerProvider');
  }
  return context;
};

export const TimerProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    workDuration: minutesToSeconds(25),
    shortBreakDuration: minutesToSeconds(5),
    longBreakDuration: minutesToSeconds(15),
    longBreakInterval: 4
  });

  const [currentSession, setCurrentSession] = useState('work');
  const [completedSessions, setCompletedSessions] = useState(0);

  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const nextSession = useCallback(() => {
    setCompletedSessions(prev => {
      if (currentSession === 'work') {
        return prev + 1;
      }
      return prev;
    });

    setCurrentSession(prev => {
      if (prev === 'work') {
        const nextCompletedCount = completedSessions + 1;
        const isLongBreak = nextCompletedCount % settings.longBreakInterval === 0;
        return isLongBreak ? 'longBreak' : 'shortBreak';
      } else {
        return 'work';
      }
    });
  }, [currentSession, completedSessions, settings.longBreakInterval]);

  const resetSession = useCallback(() => {
    setCurrentSession('work');
    setCompletedSessions(0);
  }, []);

  const value = useMemo(() => ({
    settings,
    currentSession,
    completedSessions,
    updateSettings,
    nextSession,
    resetSession
  }), [settings, currentSession, completedSessions, updateSettings, nextSession, resetSession]);

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};