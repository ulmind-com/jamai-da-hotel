import { useState, useEffect } from 'react';

export type TiffinPeriod = 'morning' | 'evening' | 'none';

export const useTiffinTime = () => {
  const [tiffinPeriod, setTiffinPeriod] = useState<TiffinPeriod>('none');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const checkTiffinTime = () => {
      const now = new Date();
      setCurrentTime(now);
      
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinute;
      
      // Morning Tiffin time: 7:00 AM to 11:59 AM
      const morningStartTime = 7 * 60; // 7:00 AM in minutes
      const morningEndTime = 12 * 60; // 12:00 PM in minutes
      
      // Evening Tiffin time: 5:00 PM to 7:30 PM
      const eveningStartTime = 17 * 60; // 5:00 PM in minutes
      const eveningEndTime = 19 * 60 + 30; // 7:30 PM in minutes
      
      if (currentTimeInMinutes >= morningStartTime && currentTimeInMinutes < morningEndTime) {
        setTiffinPeriod('morning');
      } else if (currentTimeInMinutes >= eveningStartTime && currentTimeInMinutes < eveningEndTime) {
        setTiffinPeriod('evening');
      } else {
        setTiffinPeriod('none');
      }
    };

    checkTiffinTime();
    const interval = setInterval(checkTiffinTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return {
    tiffinPeriod,
    isMorningTiffin: tiffinPeriod === 'morning',
    isEveningTiffin: tiffinPeriod === 'evening',
    isTiffinTime: tiffinPeriod !== 'none',
    currentTime,
  };
};