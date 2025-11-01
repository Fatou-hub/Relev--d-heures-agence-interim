import React from 'react';
import { FileText } from 'lucide-react';

export const Comments = ({ value, onChange }) => (
  <div>
    <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
      <FileText className="w-5 h-5" />
      Commentaires
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows="3"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Commentaires supplémentaires..."
    />
  </div>
);