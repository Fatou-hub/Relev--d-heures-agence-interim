import React from 'react';

export const TimeInput = ({ value, onChange, className = "" }) => (
  <input
    type="time"
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    className={`w-20 px-1 py-1 text-sm text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
  />
);