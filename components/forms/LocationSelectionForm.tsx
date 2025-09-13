'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Mock data for locations
const LOCATIONS = [
  {
    id: '1',
    name: 'Downtown Medical Center',
    address: '123 Main Street, Suite 100',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    phone: '(212) 555-1234',
  },
  {
    id: '2',
    name: 'Westside Health Clinic',
    address: '456 Park Avenue',
    city: 'New York',
    state: 'NY',
    zip: '10022',
    phone: '(212) 555-5678',
  },
  {
    id: '3',
    name: 'Eastside Medical Plaza',
    address: '789 Lexington Avenue',
    city: 'New York',
    state: 'NY',
    zip: '10065',
    phone: '(212) 555-9012',
  },
];

type LocationSelectionFormProps = {
  formData: {
    location: string;
  };
  updateFormData: (data: Partial<{ location: string }>) => void;
  patientType: 'new' | 'returning' | null;
  isLoading: boolean;
};

const LocationSelectionForm = ({
  formData,
  updateFormData,
  patientType,
  isLoading,
}: LocationSelectionFormProps) => {
  const [selectedLocation, setSelectedLocation] = useState<string>(formData.location);

  const handleSelectLocation = (locationId: string) => {
    setSelectedLocation(locationId);
    updateFormData({ location: locationId });
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">Select Location</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        {LOCATIONS.map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
              'cursor-pointer rounded-xl border p-4 transition-all hover:border-[#00f5ff]/50',
              selectedLocation === location.id
                ? 'border-[#00f5ff] bg-[#00f5ff]/10'
                : 'border-gray-700 bg-[#0a041c]/50'
            )}
            onClick={() => handleSelectLocation(location.id)}
          >
            <div className="mb-3">
              <h3 className="font-medium">{location.name}</h3>
              <p className="text-sm text-gray-400">{location.address}</p>
              <p className="text-sm text-gray-400">
                {location.city}, {location.state} {location.zip}
              </p>
              <p className="mt-2 text-sm">{location.phone}</p>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id={`location-${location.id}`}
                name="location"
                checked={selectedLocation === location.id}
                onChange={() => handleSelectLocation(location.id)}
                className="h-4 w-4 accent-[#00f5ff]"
              />
              <label htmlFor={`location-${location.id}`} className="ml-2 text-sm">
                Select this location
              </label>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LocationSelectionForm;