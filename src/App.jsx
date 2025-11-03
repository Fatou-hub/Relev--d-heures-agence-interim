import React, { useState, useEffect } from 'react';
import { EmployeeInfo } from './components/form/EmployeeInfo';
import { CompanyInfo } from './components/form/CompanyInfo';
import { PeriodSelector } from './components/form/PeriodSelector';
import { HoursTable } from './components/table/HoursTable';
import { Comments } from './components/form/Comments';
import { MissionStatus } from './components/form/MissionStatus';
import { useWeekCalculation } from './hooks/useWeekCalculation';
import { calculateHoursDifference, formatDate } from './utils/timeCalculations';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    contractNumber: '',
    location: '',
    agency: 'PLURI\'RH',
    weekStart: '',
  });

  const { weekDays, weekNumber, year } = useWeekCalculation(formData.weekStart);
  const [hours, setHours] = useState({});
  const [comments, setComments] = useState('');
  const [missionStatus, setMissionStatus] = useState('continue');

  useEffect(() => {
    if (weekDays.length > 0) {
      const initialHours = {};
      weekDays.forEach((_, index) => {
        initialHours[index] = { 
          dayStart: '', 
          dayEnd: '', 
          nightStart: '', 
          nightEnd: '',
          lunchBreak: 1,
          observations: '' 
        };
      });
      setHours(initialHours);
    }
  }, [weekDays]);

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleHoursChange = (dayIndex, field, value) => {
    setHours(prev => ({
      ...prev,
      [dayIndex]: {
        ...prev[dayIndex],
        [field]: value
      }
    }));
  };

  const calculateTotals = () => {
    let totalDay = 0;
    let totalNight = 0;
    let totalHours = 0;
    
    Object.keys(hours).forEach(dayIndex => {
      const day = hours[dayIndex];
      if (day) {
        const dayHours = calculateHoursDifference(day.dayStart, day.dayEnd, day.lunchBreak || 0);
        const nightHours = calculateHoursDifference(day.nightStart, day.nightEnd, 0);
        totalDay += dayHours;
        totalNight += nightHours;
        totalHours += dayHours + nightHours;
      }
    });
    
    return { totalDay, totalNight, totalHours };
  };

const handleSubmit = async () => {
  if (!formData.firstName || !formData.lastName || !formData.company || 
      !formData.contractNumber || !formData.location || !formData.weekStart) {
    alert('Veuillez remplir tous les champs obligatoires');
    return;
  }

  // IMPORTANT : Ajoutez l'email du client
  const clientEmail = prompt('Email du client pour validation :');
  if (!clientEmail) {
    alert('L\'email du client est obligatoire pour la validation');
    return;
  }

  const totals = calculateTotals();
  const endDate = weekDays.length > 0 ? weekDays[6] : null;
  
  const submissionData = {
    salarie: {
      prenom: formData.firstName,
      nom: formData.lastName
    },
    entreprise: {
      nom: formData.company,
      numeroContrat: formData.contractNumber,
      lieu: formData.location,
      email: clientEmail  // ← Email du client
    },
    agence: formData.agency,
    periode: {
      debut: formData.weekStart,
      fin: endDate ? endDate.toISOString().split('T')[0] : '',
      semaine: weekNumber,
      annee: year
    },
    heures: weekDays.map((date, index) => {
      const day = hours[index] || {};
      return {
        date: formatDate(date),
        heuresJour: {
          debut: day.dayStart || '',
          fin: day.dayEnd || '',
          pauseMeridienne: day.lunchBreak || 0,
          total: calculateHoursDifference(day.dayStart, day.dayEnd, day.lunchBreak || 0)
        },
        heuresNuit: {
          debut: day.nightStart || '',
          fin: day.nightEnd || '',
          total: calculateHoursDifference(day.nightStart, day.nightEnd, 0)
        },
        totalJournee: calculateHoursDifference(day.dayStart, day.dayEnd, day.lunchBreak || 0) + 
                      calculateHoursDifference(day.nightStart, day.nightEnd, 0),
        observations: day.observations || ''
      };
    }),
    totaux: {
      heuresJour: totals.totalDay,
      heuresNuit: totals.totalNight,
      totalGeneral: totals.totalHours
    },
    commentaires: comments,
    statutMission: missionStatus
  };
  
  try {
    // URL du webhook n8n
    const N8N_WEBHOOK_URL = 'https://votre-instance-n8n.com/webhook/timesheet-submit';
    
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
    });

    const result = await response.json();

    if (result.success) {
      alert(`✅ ${result.message}\n\nID: ${result.recordId}`);
      
      // Réinitialiser le formulaire
      window.location.reload();
    } else {
      alert(`❌ Erreur: ${result.message}`);
    }
  } catch (error) {
    console.error('Erreur:', error);
    alert('❌ Erreur lors de la soumission. Veuillez réessayer.');
  }
};

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Relevé d'Heures</h1>
            <p className="text-gray-600">Formulaire de saisie pour intérimaires</p>
          </div>

          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <EmployeeInfo formData={formData} onChange={updateFormData} />
              <CompanyInfo formData={formData} onChange={updateFormData} />
            </div>

            <PeriodSelector 
              formData={{ ...formData, weekNumber, year }} 
              onChange={updateFormData} 
            />

            {weekDays.length > 0 && (
              <HoursTable
                weekDays={weekDays}
                hours={hours}
                onHoursChange={handleHoursChange}
                totals={totals}
              />
            )}

            <Comments value={comments} onChange={setComments} />

            <MissionStatus value={missionStatus} onChange={setMissionStatus} />

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
              >
                Soumettre le relevé d'heures
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Le relevé d'heures doit être complété et soumis à la fin de chaque semaine</p>
        </div>
      </div>
    </div>
  );
}

export default App;