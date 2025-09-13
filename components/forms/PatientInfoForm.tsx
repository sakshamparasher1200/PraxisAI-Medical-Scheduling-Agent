'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type PatientInfoFormProps = {
  formData: {
    fullName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
  };
  updateFormData: (data: Partial<typeof formData>) => void;
  isLoading: boolean;
  patientType: 'new' | 'returning' | null;
};

const PatientInfoForm = ({
  formData,
  updateFormData,
  isLoading,
  patientType,
}: PatientInfoFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    let error = '';
    
    if (!value.trim()) {
      error = 'This field is required';
    } else if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      error = 'Please enter a valid email address';
    } else if (name === 'phone' && !/^\d{10}$/.test(value.replace(/\D/g, ''))) {
      error = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">Patient Information</h2>
      
      {patientType && (
        <div className={cn(
          'mb-6 rounded-lg p-4 text-center font-medium',
          patientType === 'new' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'
        )}>
          {patientType === 'new' 
            ? 'Welcome! You are a new patient.'
            : 'Welcome back! You are a returning patient.'}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          className={cn(
            'w-full rounded-lg border bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]',
            errors.fullName ? 'border-red-500' : 'border-gray-700'
          )}
          placeholder="John Doe"
        />
        {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="dateOfBirth" className="mb-2 block text-sm font-medium">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          className={cn(
            'w-full rounded-lg border bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]',
            errors.dateOfBirth ? 'border-red-500' : 'border-gray-700'
          )}
          max={new Date().toISOString().split('T')[0]}
        />
        {errors.dateOfBirth && <p className="mt-1 text-xs text-red-500">{errors.dateOfBirth}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          className={cn(
            'w-full rounded-lg border bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]',
            errors.email ? 'border-red-500' : 'border-gray-700'
          )}
          placeholder="john.doe@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          className={cn(
            'w-full rounded-lg border bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]',
            errors.phone ? 'border-red-500' : 'border-gray-700'
          )}
          placeholder="(123) 456-7890"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>
    </div>
  );
};

export default PatientInfoForm;