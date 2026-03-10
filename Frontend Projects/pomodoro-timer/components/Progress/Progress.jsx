import React from 'react';
import styles from './Progress.module.css';

export const Progress = ({ progress }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div 
      className={styles.progress}
      role="progressbar"
      aria-valuenow={Math.round(clampedProgress)}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Session progress"
    >
      <div 
        className={styles.progressBar}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};