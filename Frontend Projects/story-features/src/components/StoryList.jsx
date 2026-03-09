// src/components/StoryList.jsx
import React from 'react';
import StoryUploader from './StoryUploader';

const StoryList = ({ stories, onStoryClick, onUpload }) => {
  return (
    <div className="flex items-center space-x-4 p-4 overflow-x-auto bg-white">
      <StoryUploader onUpload={onUpload} />
      
      {stories.map((story, index) => (
        <button
          key={story.id}
          onClick={() => onStoryClick(index)}
          className="relative flex-shrink-0 group"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-[2px]">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-white">
              <img
                src={story.imageData}
                alt="Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
            ✓
          </div>
        </button>
      ))}
    </div>
  );
};

export default StoryList;