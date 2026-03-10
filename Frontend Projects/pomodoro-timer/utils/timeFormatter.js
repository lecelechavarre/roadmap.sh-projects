export const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const minutesToSeconds = (minutes) => {
  return minutes * 60;
};

export const secondsToMinutes = (seconds) => {
  return Math.floor(seconds / 60);
};