import { useState, useEffect } from 'react';

export const useWeekCalculation = (weekStart) => {
  const [weekDays, setWeekDays] = useState([]);
  const [weekNumber, setWeekNumber] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (weekStart) {
      const startDate = new Date(weekStart);
      const days = [];
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        days.push(date);
      }
      
      setWeekDays(days);
      
      const firstDayOfYear = new Date(startDate.getFullYear(), 0, 1);
      const pastDaysOfYear = (startDate - firstDayOfYear) / 86400000;
      const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
      
      setWeekNumber(weekNum);
      setYear(startDate.getFullYear());
    }
  }, [weekStart]);

  return { weekDays, weekNumber, year };
};