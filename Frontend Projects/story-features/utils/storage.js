// src/utils/storage.js
const STORAGE_KEY = 'stories';
const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours

export const saveStory = (imageData) => {
  const stories = getStories();
  const newStory = {
    id: Date.now().toString(),
    imageData,
    timestamp: Date.now(),
    expiresAt: Date.now() + EXPIRY_TIME
  };
  
  stories.push(newStory);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  return newStory;
};

export const getStories = () => {
  const stories = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const now = Date.now();
  
  // Filter out expired stories
  const validStories = stories.filter(story => story.expiresAt > now);
  
  // Clean up localStorage if we removed any
  if (validStories.length !== stories.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validStories));
  }
  
  return validStories;
};

export const deleteStory = (storyId) => {
  const stories = getStories();
  const filtered = stories.filter(story => story.id !== storyId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const clearExpiredStories = () => {
  getStories(); // This will automatically filter expired ones
};