export const formatDate = (date) => {
  const monthNames = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 
                      'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const calculateHoursDifference = (start, end, lunchBreak = 0) => {
  if (!start || !end) return 0;
  
  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);
  
  let totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
  
  if (totalMinutes < 0) {
    totalMinutes += 24 * 60;
  }
  
  totalMinutes -= (lunchBreak * 60);
  
  return Math.max(0, totalMinutes / 60);
};