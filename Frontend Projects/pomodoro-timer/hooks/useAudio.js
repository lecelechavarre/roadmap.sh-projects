import { useRef, useCallback } from 'react';

export const useAudio = (src) => {
  const audioRef = useRef(null);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.log('Audio playback failed:', error);
      });
    }
  }, []);

  const AudioComponent = () => (
    <audio ref={audioRef} src={src} preload="auto" />
  );

  return { play, AudioComponent };
};