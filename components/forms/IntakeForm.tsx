'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type IntakeFormProps = {
  patientId?: string;
  onComplete?: () => void;
};

type FormSection = {
  id: string;
  title: string;
  description: string;
};

const IntakeForm = ({ patientId, onComplete }: IntakeFormProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Patient Information
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Insurance Information
    insuranceProvider: '',
    policyNumber: '',
    groupNumber: '',
    primaryInsured: '',
    relationshipToPatient: 'self',
    
    // Medical History
    allergies: '',
    medications: '',
    pastSurgeries: '',
    chronicConditions: '',
    
    // Lifestyle
    smokingStatus: 'never',
    alcoholConsumption: 'none',
    exerciseFrequency: 'none',
    
    // Reason for Visit
    chiefComplaint: '',
    symptomsStarted: '',
    painLevel: '0',
    
    // Consent
    consentToTreatment: false,
    consentToShareInfo: false,
  });

  const sections: FormSection[] = [
    {
      id: 'patient-info',
      title: 'Patient Information',
      description: 'Please provide your contact information',
    },
    {
      id: 'insurance',
      title: 'Insurance Information',
      description: 'Please provide your insurance details',
    },
    {
      id: 'medical-history',
      title: 'Medical History',
      description: 'Please provide your medical history',
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle',
      description: 'Please provide information about your lifestyle',
    },
    {
      id: 'reason-for-visit',
      title: 'Reason for Visit',
      description: 'Please describe why you are visiting today',
    },
    {
      id: 'consent',
      title: 'Consent',
      description: 'Please review and provide consent',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to save the intake form data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the onComplete callback if provided
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error submitting intake form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = () => {
    const section = sections[currentSection];
    
    switch (section.id) {
      case 'patient-info':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="address" className="mb-1 block text-sm font-medium">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                />
              </div>
              <div>
                <label htmlFor="city" className="mb-1 block text-sm font-medium">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="state" className="mb-1 block text-sm font-medium">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="mb-1 block text-sm font-medium">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="emergencyContact" className="mb-1 block text-sm font-medium">
                  Emergency Contact <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                />
              </div>
              <div>
                <label htmlFor="emergencyPhone" className="mb-1 block text-sm font-medium">
                  Emergency Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                />
              </div>
            </div>
          </div>
        );
        
      case 'insurance':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="insuranceProvider" className="mb-1 block text-sm font-medium">
                Insurance Provider <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="insuranceProvider"
                name="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="policyNumber" className="mb-1 block text-sm font-medium">
                  Policy Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="policyNumber"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                />
              </div>
              <div>
                <label htmlFor="groupNumber" className="mb-1 block text-sm font-medium">
                  Group Number
                </label>
                <input
                  type="text"
                  id="groupNumber"
                  name="groupNumber"
                  value={formData.groupNumber}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="primaryInsured" className="mb-1 block text-sm font-medium">
                  Primary Insured Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="primaryInsured"
                  name="primaryInsured"
                  value={formData.primaryInsured}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                />
              </div>
              <div>
                <label htmlFor="relationshipToPatient" className="mb-1 block text-sm font-medium">
                  Relationship to Patient <span className="text-red-500">*</span>
                </label>
                <select
                  id="relationshipToPatient"
                  name="relationshipToPatient"
                  value={formData.relationshipToPatient}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                >
                  <option value="self">Self</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="child">Child</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case 'medical-history':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="allergies" className="mb-1 block text-sm font-medium">
                Allergies (medications, food, environmental)
              </label>
              <textarea
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                placeholder="List any allergies or write 'None'"
              />
            </div>
            
            <div>
              <label htmlFor="medications" className="mb-1 block text-sm font-medium">
                Current Medications
              </label>
              <textarea
                id="medications"
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                placeholder="List medications with dosages or write 'None'"
              />
            </div>
            
            <div>
              <label htmlFor="pastSurgeries" className="mb-1 block text-sm font-medium">
                Past Surgeries
              </label>
              <textarea
                id="pastSurgeries"
                name="pastSurgeries"
                value={formData.pastSurgeries}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                placeholder="List surgeries with dates or write 'None'"
              />
            </div>
            
            <div>
              <label htmlFor="chronicConditions" className="mb-1 block text-sm font-medium">
                Chronic Medical Conditions
              </label>
              <textarea
                id="chronicConditions"
                name="chronicConditions"
                value={formData.chronicConditions}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                placeholder="List any chronic conditions or write 'None'"
              />
            </div>
          </div>
        );
        
      case 'lifestyle':
        return (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Smoking Status
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="smoking-never"
                    name="smokingStatus"
                    value="never"
                    checked={formData.smokingStatus === 'never'}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#00f5ff]"
                  />
                  <label htmlFor="smoking-never" className="ml-2 text-sm">
                    Never smoked
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="smoking-former"
                    name="smokingStatus"
                    value="former"
                    checked={formData.smokingStatus === 'former'}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#00f5ff]"
                  />
                  <label htmlFor="smoking-former" className="ml-2 text-sm">
                    Former smoker
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="smoking-current"
                    name="smokingStatus"
                    value="current"
                    checked={formData.smokingStatus === 'current'}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#00f5ff]"
                  />
                  <label htmlFor="smoking-current" className="ml-2 text-sm">
                    Current smoker
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium">
                Alcohol Consumption
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="alcohol-none"
                    name="alcoholConsumption"
                    value="none"
                    checked={formData.alcoholConsumption === 'none'}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#00f5ff]"
                  />
                  <label htmlFor="alcohol-none" className="ml-2 text-sm">
                    None
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="alcohol-occasional"
                    name="alcoholConsumption"
                    value="occasional"
                    checked={formData.alcoholConsumption === 'occasional'}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#00f5ff]"
                  />
                  <label htmlFor="alcohol-occasional" className="ml-2 text-sm">
                    Occasional (1-2 drinks per week)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="alcohol-moderate"
                    name="alcoholConsumption"
                    value="moderate"
                    checked={formData.alcoholConsumption === 'moderate'}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#00f5ff]"
                  />
                  <label htmlFor="alcohol-moderate" className="ml-2 text-sm">
                    Moderate (3-7 drinks per week)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="alcohol-heavy"
                    name="alcoholConsumption"
                    value="heavy"
                    checked={formData.alcoholConsumption === 'heavy'}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#00f5ff]"
                  />
                  <label htmlFor="alcohol-heavy" className="ml-2 text-sm">
                    Heavy (8+ drinks per week)
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium">
                Exercise Frequency
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="exercise-none"
                    name="exerciseFrequency"
                    value="none"
                    checked={formData.exerciseFrequency === 'none'}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#00f5ff]"
                  />
                  <label htmlFor="exercise-none" className="ml-2 text-sm">
                    None
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="exercise-occasional"
                    name="exerciseFrequency"
                    value="occasional"
                    checked={formData.exerciseFrequency === 'occasional'}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#00f5ff]"
                  />
                  <label htmlFor="exercise-occasional" className="ml-2 text-sm">
                    Occasional (1-2 times per week)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="exercise-regular"
                    name="exerciseFrequency"
                    value="regular"
                    checked={formData.exerciseFrequency === 'regular'}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#00f5ff]"
                  />
                  <label htmlFor="exercise-regular" className="ml-2 text-sm">
                    Regular (3-5 times per week)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="exercise-daily"
                    name="exerciseFrequency"
                    value="daily"
                    checked={formData.exerciseFrequency === 'daily'}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#00f5ff]"
                  />
                  <label htmlFor="exercise-daily" className="ml-2 text-sm">
                    Daily
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'reason-for-visit':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="chiefComplaint" className="mb-1 block text-sm font-medium">
                Chief Complaint <span className="text-red-500">*</span>
              </label>
              <textarea
                id="chiefComplaint"
                name="chiefComplaint"
                value={formData.chiefComplaint}
                onChange={handleChange}
                rows={4}
                required
                className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                placeholder="Describe your main symptoms or reason for visit"
              />
            </div>
            
            <div>
              <label htmlFor="symptomsStarted" className="mb-1 block text-sm font-medium">
                When did symptoms start? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="symptomsStarted"
                name="symptomsStarted"
                value={formData.symptomsStarted}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-700 bg-[#0a041c] p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                placeholder="e.g., 3 days ago, 2 weeks ago, etc."
              />
            </div>
            
            <div>
              <label htmlFor="painLevel" className="mb-1 block text-sm font-medium">
                Pain Level (0-10)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  id="painLevel"
                  name="painLevel"
                  min="0"
                  max="10"
                  value={formData.painLevel}
                  onChange={handleChange}
                  className="w-full accent-[#00f5ff]"
                />
                <span className="w-8 text-center">{formData.painLevel}</span>
              </div>
              <div className="mt-1 flex justify-between text-xs">
                <span>No Pain</span>
                <span>Worst Pain</span>
              </div>
            </div>
          </div>
        );
        
      case 'consent':
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-700 bg-[#0a041c]/50 p-4">
              <h3 className="mb-2 font-medium">Consent to Treatment</h3>
              <p className="mb-4 text-sm text-gray-300">
                I voluntarily consent to receive medical and health care services provided by Praxis Medical
                doctors, employees, and other health care providers. I understand that such services may include
                diagnostic procedures, examinations, and treatments.
              </p>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="consentToTreatment"
                  name="consentToTreatment"
                  checked={formData.consentToTreatment as boolean}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 accent-[#00f5ff]"
                />
                <label htmlFor="consentToTreatment" className="ml-2 text-sm">
                  I agree and consent to treatment <span className="text-red-500">*</span>
                </label>
              </div>
            </div>
            
            <div className="rounded-lg border border-gray-700 bg-[#0a041c]/50 p-4">
              <h3 className="mb-2 font-medium">Consent to Share Information</h3>
              <p className="mb-4 text-sm text-gray-300">
                I authorize Praxis Medical to release my medical and related information to my insurance
                companies, healthcare providers, and other parties as necessary for treatment, payment, and
                healthcare operations.
              </p>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="consentToShareInfo"
                  name="consentToShareInfo"
                  checked={formData.consentToShareInfo as boolean}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 accent-[#00f5ff]"
                />
                <label htmlFor="consentToShareInfo" className="ml-2 text-sm">
                  I agree to the sharing of my information <span className="text-red-500">*</span>
                </label>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">
          Digital Intake Form
        </h2>
        <p className="text-gray-300">
          Please complete all sections of this form. Fields marked with <span className="text-red-500">*</span> are required.
        </p>
      </div>
      
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="mb-4 flex justify-between">
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                  currentSection >= index
                    ? 'bg-gradient-to-r from-[#8a2be2] to-[#00f5ff] text-white'
                    : 'border border-gray-600 bg-transparent text-gray-400'
                )}
              >
                {index + 1}
              </div>
              <span
                className={cn(
                  'mt-2 hidden text-xs md:block',
                  currentSection >= index ? 'text-white' : 'text-gray-400'
                )}
              >
                {section.title}
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-1 w-full rounded-full bg-gray-700">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#8a2be2] to-[#00f5ff]"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="glass rounded-lg p-6">
          <div className="mb-6">
            <h3 className="mb-1 text-xl font-medium">{sections[currentSection].title}</h3>
            <p className="text-sm text-gray-300">{sections[currentSection].description}</p>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentSection === 0 || isSubmitting}
            className={cn(
              'rounded-full px-6 py-2 font-medium transition-all',
              currentSection === 0 || isSubmitting
                ? 'cursor-not-allowed opacity-50'
                : 'border border-gray-600 hover:border-[#00f5ff] hover:text-[#00f5ff]'
            )}
          >
            Back
          </button>
          
          {currentSection === sections.length - 1 ? (
            <button
              type="submit"
              disabled={isSubmitting || !formData.consentToTreatment || !formData.consentToShareInfo}
              className={cn(
                'rounded-full bg-gradient-to-r from-[#8a2be2] to-[#00f5ff] px-6 py-2 font-medium text-white transition-all hover:shadow-lg',
                (isSubmitting || !formData.consentToTreatment || !formData.consentToShareInfo) && 'cursor-not-allowed opacity-70'
              )}
            >
              {isSubmitting ? (
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
                  Submitting...
                </span>
              ) : (
                'Submit Form'
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className={cn(
                'rounded-full bg-gradient-to-r from-[#8a2be2] to-[#00f5ff] px-6 py-2 font-medium text-white transition-all hover:shadow-lg',
                isSubmitting && 'cursor-not-allowed opacity-70'
              )}
            >
              Continue
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default IntakeForm;