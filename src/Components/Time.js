import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const timeInIST = moment().tz('Asia/Kolkata').format('hh:mm:ss A');
      setCurrentTime(timeInIST);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>{currentTime}</p>
    </div>
  );
};

export default Clock;
