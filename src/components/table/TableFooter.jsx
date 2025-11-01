import React from 'react';

export const TableFooter = ({ totals }) => (
  <tfoot>
    <tr className="bg-gradient-to-r from-blue-100 to-indigo-100 font-bold">
      <td colSpan="3" className="px-3 py-3 text-right text-gray-700">TOTAUX</td>
      <td className="px-2 py-3 text-center">-</td>
      <td className="px-2 py-3 text-center text-blue-700">
        {totals.totalDay.toFixed(2)}h
      </td>
      <td colSpan="2" className="px-2 py-3 text-center text-purple-700 border-l border-blue-200">
        {totals.totalNight.toFixed(2)}h
      </td>
      <td className="px-2 py-3 text-center text-indigo-800 border-l border-blue-200 text-lg">
        {totals.totalHours.toFixed(2)}h
      </td>
      <td className="border-l border-blue-200"></td>
    </tr>
  </tfoot>
);