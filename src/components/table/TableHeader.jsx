import React from 'react';

export const TableHeader = () => (
  <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
    <tr>
      <th className="px-3 py-3 text-left" rowSpan="2">Jour</th>
      <th className="px-3 py-3 text-left" rowSpan="2">Date</th>
      <th className="px-3 py-3 text-center border-l border-blue-400" colSpan="4">
        Heures de jour
      </th>
      <th className="px-3 py-3 text-center border-l border-blue-400" colSpan="2">
        Heures de nuit (21h-6h)
      </th>
      <th className="px-3 py-3 text-center border-l border-blue-400" rowSpan="2">
        Total
      </th>
      <th className="px-3 py-3 text-left border-l border-blue-400" rowSpan="2">
        Observations
      </th>
    </tr>
    <tr>
      <th className="px-2 py-2 text-xs border-l border-blue-400">De</th>
      <th className="px-2 py-2 text-xs">À</th>
      <th className="px-2 py-2 text-xs">Pause</th>
      <th className="px-2 py-2 text-xs">Total</th>
      <th className="px-2 py-2 text-xs border-l border-blue-400">De</th>
      <th className="px-2 py-2 text-xs">À</th>
    </tr>
  </thead>
);