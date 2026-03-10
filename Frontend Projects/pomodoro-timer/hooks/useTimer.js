import { useState, useEffect, useCallback, useRef } from 'react';

export const useTimer = (initialTime, onComplete) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const initialTimeRef = useRef(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
    initialTimeRef.current = initialTime;
  }, [initialTime]);

  const start = useCallback(() => {
    if (!isRunning && timeLeft > 0) {
      setIsRunning(true);
    }
  }, [isRunning, timeLeft]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(initialTimeRef.current);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            if (onComplete) {
              setTimeout(() => onComplete(), 0);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onComplete]);

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset
  };
};