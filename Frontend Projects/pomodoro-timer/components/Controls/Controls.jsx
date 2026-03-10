import React from 'react';
import styles from './Controls.module.css';

export const Controls = ({ isRunning, onStart, onPause, onReset, disabled = false }) => {
  return (
    <div className={styles.controls}>
      {!isRunning ? (
        <button 
          className={`${styles.button} ${styles.start}`}
          onClick={onStart}
          aria-label="Start timer"
          disabled={disabled}
        >
          Start
        </button>
      ) : (
        <button 
          className={`${styles.button} ${styles.pause}`}
          onClick={onPause}
          aria-label="Pause timer"
          disabled={disabled}
        >
          Pause
        </button>
      )}
      <button 
        className={`${styles.button} ${styles.reset}`}
        onClick={onReset}
        aria-label="Reset timer"
        disabled={disabled}
      >
        Reset
      </button>
    </div>
  );
};