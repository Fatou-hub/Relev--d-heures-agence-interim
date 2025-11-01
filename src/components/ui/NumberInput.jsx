import React from 'react';

export const NumberInput = ({ value, onChange, ...props }) => (
  <input
    type="number"
    value={value || ''}
    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
    className="w-14 px-1 py-1 text-sm text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    {...props}
  />
);