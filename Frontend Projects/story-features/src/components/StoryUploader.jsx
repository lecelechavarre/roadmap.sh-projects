// src/components/StoryUploader.jsx
import React, { useRef } from 'react';

const StoryUploader = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      await onUpload(file);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="w-16 h-16 rounded-full bg-gray-100 shadow-md flex items-center justify-center text-3xl text-gray-600 hover:bg-gray-200 transition-all border-2 border-dashed border-gray-300"
      >
        +
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};

export default StoryUploader;