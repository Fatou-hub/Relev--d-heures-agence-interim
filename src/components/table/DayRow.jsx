import React from 'react';
import { TimeInput } from '../ui/TimeInput';
import { NumberInput } from '../ui/NumberInput';
import { TextInput } from '../ui/TextInput';
import { calculateHoursDifference, formatDate } from '../../utils/timeCalculations';

export const DayRow = ({ day, date, index, hours, onHoursChange }) => {
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const dayData = hours[index] || {};
  const dayHours = calculateHoursDifference(dayData.dayStart, dayData.dayEnd, dayData.lunchBreak || 0);
  const nightHours = calculateHoursDifference(dayData.nightStart, dayData.nightEnd, 0);
  const totalDay = dayHours + nightHours;

  return (
    <tr className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
      <td className="px-3 py-3 font-medium text-gray-700">{daysOfWeek[index]}</td>
      <td className="px-3 py-3 text-gray-600 text-sm whitespace-nowrap">{formatDate(date)}</td>
      
      <td className="px-2 py-2 border-l border-gray-200">
        <TimeInput
          value={dayData.dayStart}
          onChange={(val) => onHoursChange(index, 'dayStart', val)}
        />
      </td>
      <td className="px-2 py-2">
        <TimeInput
          value={dayData.dayEnd}
          onChange={(val) => onHoursChange(index, 'dayEnd', val)}
        />
      </td>
      <td className="px-2 py-2">
        <NumberInput
          value={dayData.lunchBreak}
          onChange={(val) => onHoursChange(index, 'lunchBreak', val)}
          step="0.25"
          min="0"
          max="3"
          placeholder="1"
        />
      </td>
      <td className="px-2 py-2 text-center font-semibold text-blue-700">
        {dayHours > 0 ? `${dayHours.toFixed(2)}h` : '-'}
      </td>
      
      <td className="px-2 py-2 border-l border-gray-200">
        <TimeInput
          value={dayData.nightStart}
          onChange={(val) => onHoursChange(index, 'nightStart', val)}
          className="focus:ring-purple-500"
        />
      </td>
      <td className="px-2 py-2">
        <TimeInput
          value={dayData.nightEnd}
          onChange={(val) => onHoursChange(index, 'nightEnd', val)}
          className="focus:ring-purple-500"
        />
      </td>
      
      <td className="px-2 py-2 text-center font-bold text-purple-700 border-l border-gray-200">
        {totalDay > 0 ? `${totalDay.toFixed(2)}h` : '-'}
      </td>
      <td className="px-2 py-2 border-l border-gray-200">
        <TextInput
          value={dayData.observations}
          onChange={(val) => onHoursChange(index, 'observations', val)}
          placeholder="..."
        />
      </td>
    </tr>
  );
};