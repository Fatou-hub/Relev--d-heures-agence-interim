import React from 'react';
import { Building2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { SectionHeader } from '../ui/SectionHeader';

export const CompanyInfo = ({ formData, onChange }) => (
  <div className="space-y-4">
    <SectionHeader icon={Building2} title="Entreprise Utilisatrice" />
    <Input
      type="text"
      placeholder="Nom de l'entreprise"
      value={formData.company}
      onChange={(e) => onChange({ company: e.target.value })}
    />
    <Input
      type="text"
      placeholder="N° de contrat"
      value={formData.contractNumber}
      onChange={(e) => onChange({ contractNumber: e.target.value })}
    />
    <Input
      type="text"
      placeholder="Lieu (adresse complète)"
      value={formData.location}
      onChange={(e) => onChange({ location: e.target.value })}
    />
  </div>
);