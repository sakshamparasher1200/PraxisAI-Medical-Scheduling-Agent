'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="glass flex w-full items-center justify-between rounded-lg p-4 text-left text-lg font-medium text-white hover:bg-[#8a2be2]/20"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-[#00f5ff]" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="glass mt-2 rounded-lg p-4 text-white">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage = () => {
  const faqs = [
    {
      question: 'What services does Praxis AI Medical offer?',
      answer: 'Praxis AI Medical offers a range of healthcare services including primary care, specialist consultations, preventive care, chronic disease management, and telehealth services. Our AI-powered platform helps streamline the scheduling and intake process for a seamless patient experience.'
    },
    {
      question: 'How do I schedule an appointment?',
      answer: 'You can schedule an appointment through our online platform by clicking on the "Schedule" tab, selecting your preferred doctor, date, and time. Our AI system will help find the best match based on your needs and availability. You can also reschedule or cancel appointments through the same system.'
    },
    {
      question: 'What insurance plans do you accept?',
      answer: 'We accept most major insurance plans including Medicare, Medicaid, Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, and many others. Please contact our office or check the "Insurance" section for a complete list of accepted plans.'
    },
    {
      question: 'How does the digital intake form work?',
      answer: 'Our digital intake form allows you to provide your medical history, current medications, allergies, and reason for visit before your appointment. This information is securely stored and helps our healthcare providers prepare for your visit, making the in-person time more efficient and focused on your care.'
    },
    {
      question: 'Is my medical information secure?',
      answer: 'Yes, we take patient privacy and data security very seriously. Our platform is HIPAA-compliant and uses industry-leading encryption and security measures to protect your personal and medical information. We never share your data with third parties without your explicit consent.'
    },
    {
      question: 'Can I access my medical records online?',
      answer: 'Yes, registered patients can access their medical records, test results, and treatment plans through our secure patient portal. You can also message your healthcare provider, request prescription refills, and view your appointment history.'
    },
    {
      question: 'What should I bring to my first appointment?',
      answer: 'Please bring a valid photo ID, your insurance card, a list of current medications, and any relevant medical records or test results from previous providers. If you\'ve completed the digital intake form, you\'re already one step ahead!'
    },
    {
      question: 'Do you offer telehealth services?',
      answer: 'Yes, we offer comprehensive telehealth services for many types of appointments. Virtual visits can be scheduled through our platform just like in-person appointments, and are conducted through our secure, easy-to-use video conferencing system.'
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Frequently Asked <span className="text-[#00f5ff]">Questions</span>
        </h1>
        <p className="mb-12 text-center text-lg text-white/80">
          Find answers to common questions about our services, appointments, and medical care.
        </p>

        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/80">
            Don't see your question here? Contact us at{' '}
            <a href="mailto:support@praxisai.com" className="text-[#00f5ff] hover:underline">
              support@praxisai.com
            </a>{' '}
            or call <span className="text-[#00f5ff]">(555) 123-4567</span>
          </p>
        </div>
      </motion.div>
    </main>
  );
};

export default FAQPage;