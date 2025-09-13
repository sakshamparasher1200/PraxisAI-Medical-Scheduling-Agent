'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import MultiStepForm from '@/components/MultiStepForm';

export default function SchedulePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-3xl font-bold md:text-4xl"
        >
          Schedule Your Appointment
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-2xl text-gray-300"
        >
          Complete the form below to book your appointment with one of our specialists.
          {' '}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="/intake" className="text-[#00f5ff] underline hover:text-[#00f5ff]/80">
              New patients should complete our intake form
            </a>
            .
          </motion.span>
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto max-w-3xl"
      >
        <div className="glass rounded-xl p-6 md:p-8">
          <MultiStepForm />
        </div>
      </motion.div>
    </div>
  );
}