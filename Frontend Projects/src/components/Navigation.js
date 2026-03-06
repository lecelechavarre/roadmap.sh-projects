import React from 'react';
import './Navigation.css';

const Navigation = ({ currentIndex, totalCards, onPrevious, onNext }) => {
  return (
    <div className="navigation">
      <button 
        className="nav-button previous" 
        onClick={onPrevious} 
        disabled={currentIndex === 0}
      >
        <span className="nav-icon">←</span> Previous
      </button>
      <div className="card-counter">
        {currentIndex + 1} / {totalCards}
      </div>
      <button 
        className="nav-button next" 
        onClick={onNext} 
        disabled={currentIndex === totalCards - 1}
      >
        Next <span className="nav-icon">→</span>
      </button>
    </div>
  );
};

export default Navigation;