import React from 'react';

export const SectionHeader = ({ icon: Icon, title }) => (
  <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
    <Icon className="w-5 h-5" />
    {title}
  </h2>
);