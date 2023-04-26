import React, { useState, useEffect } from 'react';
import Header from './Reusable/Header';
import '../css/Sleep.css';

function Sleep() {
  const [bedTime, setBedTime] = useState(null);
  const [awakeTime, setAwakeTime] = useState(null);
  const [currentDay, setCurrentDay] = useState('');
  const [nextDay, setNextDay] = useState('');

  useEffect(() => {
    const now = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = now.getDay();
    const nextDayIndex = (currentDayIndex + 1) % 7;
    setCurrentDay(dayNames[currentDayIndex]);
    setNextDay(dayNames[nextDayIndex]);

    if (now.getHours() >= 15) {
      setBedTime(now);
    } else {
      setBedTime(new Date(now.setDate(now.getDate() - 1)));
    }
  }, []);

  const handleSetBedTime = () => {
    const time = new Date();
    if (time.getHours() < 2) {
      time.setDate(time.getDate() - 1);
    }
    setBedTime(time);
  };

  const handleSetAwakeTime = () => {
    setAwakeTime(new Date());
  };

  const getBarPosition = (time) => {
    if (!time) return 0;
    const totalMinutes = (time.getHours() * 60) + time.getMinutes();
    const barHeight = 300;
    const dayMinutes = 24 * 60;
    return (totalMinutes / dayMinutes) * barHeight;
  };

  const bedTimePosition = getBarPosition(bedTime);
  const awakeTimePosition = getBarPosition(awakeTime);
  const blueBarStyle = {
    top: `${bedTimePosition}px`,
    height: `${awakeTimePosition - bedTimePosition}px`,
  };

  const formatTime = (time) => {
    return time ? `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}` : '';
  };

  return (
    <div className="Sleep">
      <Header title="Sleep" />
      <div className="orange-bar">
        <div className="time-label" style={{ top: 0 }}>12 PM</div>
        <div className="time-label" style={{ top: '25%' }}>6 PM</div>
        <div className="time-label" style={{ top: '50%' }}>12 AM</div>
        <div className="time-label" style={{ top: '75%' }}>6 AM</div>
        <div className="time-label" style={{ top: '100%' }}>12 PM</div>
        <div className="blue-bar" style={blueBarStyle}></div>
        {bedTime && (
          <div className="time-label" style={{ top: bedTimePosition }}>
            {formatTime(bedTime)}
          </div>
        )}
        {awakeTime && (
          <div className="time-label" style={{ top: awakeTimePosition }}>
            {formatTime(awakeTime)}
          </div>
        )}
      </div>
      <div className="day-labels">
        <div className="day-label" style={{ top: 0 }}>{currentDay}</div>
        <div className="day-label" style={{ bottom: 0 }}>{nextDay}</div>
      </div>
      <div className="buttons">
        <button onClick={handleSetBedTime}>Set Bed Time</button>
        <button onClick={handleSetAwakeTime}>Set Awake Time</button>
      </div>
    </div>
  );
}

export default Sleep;
