// src/components/ProgressBar.jsx
import React, { useEffect, useRef } from 'react';

const ProgressBar = ({ isActive }) => {
  const progressRef = useRef(null);

  useEffect(() => {
    if (isActive && progressRef.current) {
      progressRef.current.style.animation = 'none';
      progressRef.current.offsetHeight; // Trigger reflow
      progressRef.current.style.animation = 'progress 3s linear forwards';
    }
  }, [isActive]);

  return (
    <div className="h-1 bg-gray-300 flex-1 rounded-full overflow-hidden">
      <div
        ref={progressRef}
        className={`h-full bg-blue-500 rounded-full ${isActive ? 'animate-progress' : ''}`}
        style={{ width: isActive ? '0%' : '0%' }}
      />
    </div>
  );
};

export default ProgressBar;