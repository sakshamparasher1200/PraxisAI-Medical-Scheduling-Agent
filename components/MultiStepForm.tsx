'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import PatientInfoForm from './forms/PatientInfoForm';
import DoctorSelectionForm from './forms/DoctorSelectionForm';
import LocationSelectionForm from './forms/LocationSelectionForm';
import AppointmentConfirmation from './forms/AppointmentConfirmation';

type FormData = {
  fullName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  preferredDoctor: string;
  location: string;
};

const INITIAL_FORM_DATA: FormData = {
  fullName: '',
  dateOfBirth: '',
  email: '',
  phone: '',
  preferredDoctor: '',
  location: '',
};

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [patientType, setPatientType] = useState<'new' | 'returning' | null>(null);

  const steps = [
    { title: 'Patient Information', component: PatientInfoForm },
    { title: 'Select Doctor', component: DoctorSelectionForm },
    { title: 'Select Location', component: LocationSelectionForm },
    { title: 'Confirmation', component: AppointmentConfirmation },
  ];

  const handleNext = async () => {
    if (currentStep === 0) {
      // After collecting patient info, check if they are new or returning
      setIsLoading(true);
      try {
        // In a real app, this would be an API call to check the patient database
        // For now, we'll simulate a delay and randomly assign patient type
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const isNewPatient = Math.random() > 0.5; // Randomly determine for demo purposes
        setPatientType(isNewPatient ? 'new' : 'returning');
      } catch (error) {
        console.error('Error checking patient status:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data });
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div>
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="mb-4 flex justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                  currentStep >= index
                    ? 'bg-gradient-to-r from-[#8a2be2] to-[#00f5ff] text-white'
                    : 'border border-gray-600 bg-transparent text-gray-400'
                )}
              >
                {index + 1}
              </div>
              <span
                className={cn(
                  'mt-2 hidden text-xs md:block',
                  currentStep >= index ? 'text-white' : 'text-gray-400'
                )}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-1 w-full rounded-full bg-gray-700">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#8a2be2] to-[#00f5ff]"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            patientType={patientType}
            isLoading={isLoading}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={cn(
            'rounded-full px-6 py-2 font-medium transition-all',
            currentStep === 0
              ? 'cursor-not-allowed opacity-50'
              : 'border border-gray-600 hover:border-[#00f5ff] hover:text-[#00f5ff]'
          )}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={isLoading}
          className={cn(
            'rounded-full bg-gradient-to-r from-[#8a2be2] to-[#00f5ff] px-6 py-2 font-medium text-white transition-all hover:shadow-lg',
            isLoading && 'cursor-wait opacity-70'
          )}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : currentStep === steps.length - 1 ? (
            'Confirm Appointment'
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm;