import { useState, useEffect } from 'react';

export const useThaliTime = () => {
  const [isThaliTime, setIsThaliTime] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const checkThaliTime = () => {
      const now = new Date();
      setCurrentTime(now);
      
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinute;
      
      // Thali time: 12:00 PM to 3:30 PM
      const thaliStartTime = 12 * 60; // 12:00 PM in minutes
      const thaliEndTime = 15 * 60 + 30; // 3:30 PM in minutes
      
      const isCurrentlyThaliTime = currentTimeInMinutes >= thaliStartTime && currentTimeInMinutes < thaliEndTime;
      
      setIsThaliTime(isCurrentlyThaliTime);
    };

    checkThaliTime();
    const interval = setInterval(checkThaliTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return {
    isThaliTime,
    currentTime,
  };
};
