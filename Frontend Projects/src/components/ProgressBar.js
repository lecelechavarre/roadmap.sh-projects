import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ current, total }) => {
  const percentage = ((current / total) * 100).toFixed(0);

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span>Progress</span>
        <span>{current} of {total}</span>
      </div>
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="progress-percentage">{percentage}%</div>
    </div>
  );
};

export default ProgressBar;