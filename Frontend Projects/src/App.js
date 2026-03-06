import React, { useState } from 'react';
import FlashCard from './components/FlashCard';
import ProgressBar from './components/ProgressBar';
import Navigation from './components/Navigation';
import flashcardsData from './data/flashcardsData';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcardsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentCard = flashcardsData[currentIndex];

  return (
    <div className="app">
      <header className="app-header">
        <h1>Flashcards</h1>
        <p>Test your knowledge - one card at a time!</p>
      </header>

      <main className="main-content">
        <ProgressBar 
          current={currentIndex + 1} 
          total={flashcardsData.length} 
        />
        
        <div className="flashcard-wrapper">
          <FlashCard 
            question={currentCard.question} 
            answer={currentCard.answer} 
          />
        </div>

        <Navigation 
          currentIndex={currentIndex}
          totalCards={flashcardsData.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </main>

    </div>
  );
}

export default App;