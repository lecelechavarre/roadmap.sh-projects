// src/hooks/useStories.js
import { useState, useEffect, useCallback } from 'react';
import { getStories, saveStory, clearExpiredStories } from '../utils/storage';
import { processImage } from '../utils/imageUtils';

export const useStories = () => {
  const [stories, setStories] = useState([]);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Load stories on mount
  useEffect(() => {
    loadStories();
    
    // Clear expired stories every minute
    const interval = setInterval(() => {
      clearExpiredStories();
      loadStories();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const loadStories = () => {
    const loadedStories = getStories();
    setStories(loadedStories);
  };

  const addStory = async (file) => {
    try {
      const processedImage = await processImage(file);
      const newStory = saveStory(processedImage);
      setStories(prev => [...prev, newStory]);
      return newStory;
    } catch (error) {
      console.error('Error adding story:', error);
      throw error;
    }
  };

  const openStory = (index) => {
    setSelectedStoryIndex(index);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    setSelectedStoryIndex(null);
  };

  const goToNextStory = useCallback(() => {
    if (selectedStoryIndex !== null && selectedStoryIndex < stories.length - 1) {
      setSelectedStoryIndex(selectedStoryIndex + 1);
    } else {
      closeViewer();
    }
  }, [selectedStoryIndex, stories.length]);

  const goToPrevStory = useCallback(() => {
    if (selectedStoryIndex !== null && selectedStoryIndex > 0) {
      setSelectedStoryIndex(selectedStoryIndex - 1);
    }
  }, [selectedStoryIndex]);

  return {
    stories,
    selectedStoryIndex,
    isViewerOpen,
    addStory,
    openStory,
    closeViewer,
    goToNextStory,
    goToPrevStory
  };
};