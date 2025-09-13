'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type AppointmentConfirmationProps = {
  formData: {
    fullName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    preferredDoctor: string;
    location: string;
  };
  updateFormData: (data: any) => void;
  patientType: 'new' | 'returning' | null;
  isLoading: boolean;
};

const AppointmentConfirmation = ({
  formData,
  updateFormData,
  patientType,
  isLoading,
}: AppointmentConfirmationProps) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [loadingSlots, setLoadingSlots] = useState(true);

  // Mock doctors and locations data
  const doctors = [
    { id: '1', name: 'Dr. Sarah Johnson' },
    { id: '2', name: 'Dr. Michael Chen' },
    { id: '3', name: 'Dr. Amara Patel' },
  ];

  const locations = [
    { id: '1', name: 'Downtown Medical Center' },
    { id: '2', name: 'Westside Health Clinic' },
    { id: '3', name: 'Eastside Medical Plaza' },
  ];

  // Get doctor and location names
  const doctorName = doctors.find(d => d.id === formData.preferredDoctor)?.name || 'Unknown';
  const locationName = locations.find(l => l.id === formData.location)?.name || 'Unknown';

  // Mock time slots
  const timeSlots = [
    { id: '1', date: '2023-06-15', time: '9:00 AM', available: true },
    { id: '2', date: '2023-06-15', time: '10:00 AM', available: true },
    { id: '3', date: '2023-06-15', time: '11:00 AM', available: false },
    { id: '4', date: '2023-06-15', time: '1:00 PM', available: true },
    { id: '5', date: '2023-06-15', time: '2:00 PM', available: true },
  ];

  useEffect(() => {
    // Simulate API call to fetch available slots
    const timer = setTimeout(() => {
      setLoadingSlots(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectSlot = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">Confirm Your Appointment</h2>
      
      <div className="mb-6 rounded-xl border border-gray-700 bg-[#0a041c]/50 p-4">
        <h3 className="mb-3 text-lg font-medium">Appointment Details</h3>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Patient:</span>
            <span>{formData.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Date of Birth:</span>
            <span>{formData.dateOfBirth}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Patient Type:</span>
            <span className={patientType === 'new' ? 'text-green-400' : 'text-blue-400'}>
              {patientType === 'new' ? 'New Patient (60 min)' : 'Returning Patient (30 min)'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Doctor:</span>
            <span>{doctorName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Location:</span>
            <span>{locationName}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 text-lg font-medium">Select Appointment Time</h3>
        {loadingSlots ? (
          <div className="flex items-center justify-center py-8">
            <svg className="h-6 w-6 animate-spin text-[#00f5ff]" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="ml-2">Loading available time slots...</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => handleSelectSlot(slot.id)}
                disabled={!slot.available}
                className={cn(
                  'rounded-lg border p-2 text-center text-sm transition-all',
                  !slot.available && 'cursor-not-allowed opacity-50',
                  slot.available && selectedSlot === slot.id
                    ? 'border-[#00f5ff] bg-[#00f5ff]/10 text-white'
                    : slot.available
                    ? 'border-gray-700 hover:border-gray-500'
                    : 'border-gray-800 bg-gray-900/30'
                )}
              >
                {slot.time}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedSlot && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-center text-green-400"
        >
          <p className="font-medium">
            Your appointment is ready to be confirmed for{' '}
            {timeSlots.find(slot => slot.id === selectedSlot)?.date} at{' '}
            {timeSlots.find(slot => slot.id === selectedSlot)?.time}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default AppointmentConfirmation;