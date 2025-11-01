import React from 'react';
import { Clock, Coffee } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { TableHeader } from './TableHeader';
import { TableFooter } from './TableFooter';
import { DayRow } from './DayRow';

export const HoursTable = ({ weekDays, hours, onHoursChange, totals }) => (
  <div className="overflow-x-auto">
    <SectionHeader icon={Clock} title="Heures travaillées" />
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800">
      <Coffee className="w-4 h-4 inline mr-2" />
      <strong>Heures de nuit :</strong> entre 21h00 et 06h00 du matin
    </div>
    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
      <TableHeader />
      <tbody>
        {weekDays.map((date, index) => (
          <DayRow
            key={index}
            day={index}
            date={date}
            index={index}
            hours={hours}
            onHoursChange={onHoursChange}
          />
        ))}
      </tbody>
      <TableFooter totals={totals} />
    </table>
  </div>
);