import React from 'react';
import { User } from 'lucide-react';
import { Input } from '../ui/Input';
import { SectionHeader } from '../ui/SectionHeader';

export const EmployeeInfo = ({ formData, onChange }) => (
  <div className="space-y-4">
    <SectionHeader icon={User} title="Salarié" />
    <Input
      type="text"
      placeholder="Prénom"
      value={formData.firstName}
      onChange={(e) => onChange({ firstName: e.target.value })}
    />
    <Input
      type="text"
      placeholder="Nom"
      value={formData.lastName}
      onChange={(e) => onChange({ lastName: e.target.value })}
    />
    <Input
      type="text"
      placeholder="Agence d'intérim"
      value={formData.agency}
      onChange={(e) => onChange({ agency: e.target.value })}
    />
  </div>
);