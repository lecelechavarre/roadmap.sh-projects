import React from 'react';
import { formatTime } from '../../utils/timeFormatter';
import styles from './Timer.module.css';

export const Timer = ({ timeLeft, sessionType }) => {
  return (
    <div className={styles.timer}>
      <h2 id="session-type">{sessionType}</h2>
      <div 
        className={styles.time} 
        aria-live="polite"
        aria-label={`${formatTime(timeLeft)} remaining`}
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};