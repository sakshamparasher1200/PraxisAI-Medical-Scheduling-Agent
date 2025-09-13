'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Mock data for doctors
const DOCTORS = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Family Medicine',
    calendlyLink: 'sarah-johnson',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    calendlyLink: 'michael-chen',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Dr. Amara Patel',
    specialty: 'Pediatrics',
    calendlyLink: 'amara-patel',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop',
  },
];

type DoctorSelectionFormProps = {
  formData: {
    preferredDoctor: string;
  };
  updateFormData: (data: Partial<{ preferredDoctor: string }>) => void;
  patientType: 'new' | 'returning' | null;
  isLoading: boolean;
};

const DoctorSelectionForm = ({
  formData,
  updateFormData,
  patientType,
  isLoading,
}: DoctorSelectionFormProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState<string>(formData.preferredDoctor);

  const handleSelectDoctor = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    updateFormData({ preferredDoctor: doctorId });
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">Select Your Doctor</h2>
      
      {patientType && (
        <div className="mb-6 rounded-lg bg-blue-500/10 p-3 text-sm text-blue-300">
          <p className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {patientType === 'new' 
              ? 'As a new patient, your appointment will be scheduled for 60 minutes.'
              : 'As a returning patient, your appointment will be scheduled for 30 minutes.'}
          </p>
        </div>
      )}
      
      <div className="grid gap-4 md:grid-cols-3">
        {DOCTORS.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
              'cursor-pointer rounded-xl border p-4 transition-all hover:border-[#00f5ff]/50',
              selectedDoctor === doctor.id
                ? 'border-[#00f5ff] bg-[#00f5ff]/10'
                : 'border-gray-700 bg-[#0a041c]/50'
            )}
            onClick={() => handleSelectDoctor(doctor.id)}
          >
            <div className="mb-3 flex items-center space-x-3">
              <div className="h-12 w-12 overflow-hidden rounded-full">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{doctor.name}</h3>
                <p className="text-sm text-gray-400">{doctor.specialty}</p>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id={`doctor-${doctor.id}`}
                name="doctor"
                checked={selectedDoctor === doctor.id}
                onChange={() => handleSelectDoctor(doctor.id)}
                className="h-4 w-4 accent-[#00f5ff]"
              />
              <label htmlFor={`doctor-${doctor.id}`} className="ml-2 text-sm">
                Select
              </label>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorSelectionForm;