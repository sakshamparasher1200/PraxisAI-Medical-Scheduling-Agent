'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import IntakeForm from '@/components/forms/IntakeForm';

export default function IntakePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormComplete = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-3xl font-bold md:text-4xl"
        >
          Digital Intake Form
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-2xl text-gray-300"
        >
          Please complete this form before your appointment. This helps us provide you with the best care possible.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto"
      >
        {isSubmitted ? (
          <div className="glass mx-auto max-w-2xl rounded-xl p-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#8a2be2] to-[#00f5ff]">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
              </div>
              <h2 className="mb-4 text-2xl font-bold">Thank You!</h2>
              <p className="mb-6 text-gray-300">
                Your intake form has been successfully submitted. We look forward to seeing you at your appointment.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
                <a 
                  href="/schedule"
                  className="inline-block rounded-full bg-gradient-to-r from-[#8a2be2] to-[#00f5ff] px-6 py-2 font-medium text-white transition-all hover:shadow-lg"
                >
                  Schedule Appointment
                </a>
                <a 
                  href="/"
                  className="inline-block rounded-full border border-[#00f5ff] px-6 py-2 font-medium text-white transition-all hover:bg-[#00f5ff]/10"
                >
                  Return to Home
                </a>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="glass rounded-xl p-6 md:p-8">
            <IntakeForm onComplete={handleFormComplete} />
          </div>
        )}
      </motion.div>
    </div>
  );
}