import React, { useState } from 'react';
import { useTimerContext } from '../../context/TimerContext';
import { secondsToMinutes } from '../../utils/timeFormatter';
import styles from './Settings.module.css';

export const Settings = () => {
  const { settings, updateSettings } = useTimerContext();
  const [localSettings, setLocalSettings] = useState({
    workDuration: secondsToMinutes(settings.workDuration),
    shortBreakDuration: secondsToMinutes(settings.shortBreakDuration),
    longBreakDuration: secondsToMinutes(settings.longBreakDuration),
    longBreakInterval: settings.longBreakInterval
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalSettings(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings({
      workDuration: localSettings.workDuration * 60,
      shortBreakDuration: localSettings.shortBreakDuration * 60,
      longBreakDuration: localSettings.longBreakDuration * 60,
      longBreakInterval: localSettings.longBreakInterval
    });
  };

  return (
    <div className={styles.settings}>
      <h3>Settings</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.settingsGrid}>
          <div className={styles.setting}>
            <label htmlFor="workDuration">Work (minutes)</label>
            <input
              type="number"
              id="workDuration"
              name="workDuration"
              value={localSettings.workDuration}
              onChange={handleChange}
              min="1"
              max="60"
              aria-label="Work duration in minutes"
            />
          </div>
          <div className={styles.setting}>
            <label htmlFor="shortBreakDuration">Short Break (minutes)</label>
            <input
              type="number"
              id="shortBreakDuration"
              name="shortBreakDuration"
              value={localSettings.shortBreakDuration}
              onChange={handleChange}
              min="1"
              max="30"
              aria-label="Short break duration in minutes"
            />
          </div>
          <div className={styles.setting}>
            <label htmlFor="longBreakDuration">Long Break (minutes)</label>
            <input
              type="number"
              id="longBreakDuration"
              name="longBreakDuration"
              value={localSettings.longBreakDuration}
              onChange={handleChange}
              min="1"
              max="60"
              aria-label="Long break duration in minutes"
            />
          </div>
          <div className={styles.setting}>
            <label htmlFor="longBreakInterval">Sessions until long break</label>
            <input
              type="number"
              id="longBreakInterval"
              name="longBreakInterval"
              value={localSettings.longBreakInterval}
              onChange={handleChange}
              min="1"
              max="10"
              aria-label="Number of work sessions until long break"
            />
          </div>
        </div>
        <button type="submit" className={styles.applyButton}>
          Apply Settings
        </button>
      </form>
    </div>
  );
};