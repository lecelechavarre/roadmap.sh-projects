import React, { useState } from 'react';
import './FlashCard.css';

const FlashCard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        <div className="flashcard-front">
          <div className="flashcard-content">
            <p>{question}</p>
            <div className="flip-hint">Click to reveal answer</div>
          </div>
        </div>
        <div className="flashcard-back">
          <div className="flashcard-content">
            <p>{answer}</p>
            <div className="flip-hint">Click to see question</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;