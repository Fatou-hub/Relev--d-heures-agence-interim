import React from 'react';
import { Calendar } from 'lucide-react';
import { Input } from '../ui/Input';
import { SectionHeader } from '../ui/SectionHeader';

export const PeriodSelector = ({ formData, onChange }) => (
  <div className="p-4 bg-blue-50 rounded-lg">
    <SectionHeader icon={Calendar} title="Période" />
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[200px]">
        <Input
          type="date"
          label="Début de semaine (Lundi)"
          value={formData.weekStart}
          onChange={(e) => onChange({ weekStart: e.target.value })}
        />
      </div>
      {formData.weekNumber && (
        <div className="text-center px-4 py-2 bg-white rounded-lg border border-gray-200">
          <div className="text-xs text-gray-500">Semaine</div>
          <div className="font-bold text-lg text-blue-600">
            {formData.weekNumber} / {formData.year}
          </div>
        </div>
      )}
    </div>
  </div>
);