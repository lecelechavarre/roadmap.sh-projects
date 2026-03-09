// src/components/StoryViewer.jsx
import React, { useEffect, useState, useCallback } from 'react';
import ProgressBar from './ProgressBar';

const StoryViewer = ({ 
  stories, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrev 
}) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const minSwipeDistance = 50;

  const handleNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      onNext();
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onNext, onClose]);

  useEffect(() => {
    if (!isPaused && currentIndex !== null) {
      const timer = setTimeout(handleNext, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isPaused, handleNext]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      onPrev();
    }
  };

  const currentStory = stories[currentIndex];

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div 
        className="relative w-full h-full max-w-md max-h-[800px]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-10 p-2 flex space-x-1">
          {stories.map((_, index) => (
            <ProgressBar 
              key={index} 
              isActive={index === currentIndex && !isPaused}
            />
          ))}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white text-3xl hover:opacity-75 bg-black/20 rounded-full w-10 h-10 flex items-center justify-center"
        >
          ×
        </button>

        {/* Story image */}
        <img
          src={currentStory.imageData}
          alt="Story"
          className="w-full h-full object-contain"
        />

        {/* Tap areas for navigation */}
        <div className="absolute inset-0 flex">
          <div 
            className="w-1/2 h-full"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          />
          <div 
            className="w-1/2 h-full"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;