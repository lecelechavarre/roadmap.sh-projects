// src/App.jsx
import React from 'react';
import StoryList from './components/StoryList';
import StoryViewer from './components/StoryViewer';
import { useStories } from './hooks/useStories';

function App() {
  const {
    stories,
    selectedStoryIndex,
    isViewerOpen,
    addStory,
    openStory,
    closeViewer,
    goToNextStory,
    goToPrevStory
  } = useStories();

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Stories</h1>
          <p className="text-gray-500 text-sm">
            {stories.length} {stories.length === 1 ? 'story' : 'stories'} available
          </p>
        </div>

        {/* Stories List */}
        <StoryList 
          stories={stories}
          onStoryClick={openStory}
          onUpload={addStory}
        />

        {/* Empty State */}
        {stories.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            <p className="text-lg">No stories yet</p>
            <p className="text-sm mt-2">Click the + button to add your first story</p>
          </div>
        )}
      </div>

      {/* Story Viewer */}
      {isViewerOpen && (
        <StoryViewer
          stories={stories}
          currentIndex={selectedStoryIndex}
          onClose={closeViewer}
          onNext={goToNextStory}
          onPrev={goToPrevStory}
        />
      )}
    </div>
  );
}

export default App;