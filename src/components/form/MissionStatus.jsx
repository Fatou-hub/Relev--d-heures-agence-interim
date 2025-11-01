import React from 'react';

export const MissionStatus = ({ value, onChange }) => {
  const options = [
    { value: 'continue', label: 'Continue la semaine prochaine' },
    { value: 'terminee', label: 'Mission terminée' },
    { value: 'volontaire', label: 'Départ volontaire' },
    { value: 'embauche', label: 'Embauché par le client' }
  ];

  return (
    <div>
      <label className="block text-lg font-semibold text-gray-700 mb-3">
        Statut de la mission
      </label>
      <div className="grid md:grid-cols-2 gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              value === option.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="missionStatus"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="ml-3 text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};