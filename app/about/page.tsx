'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Medical Officer',
      bio: 'Board-certified in Internal Medicine with over 15 years of experience in healthcare innovation and AI integration in clinical settings.',
      imagePath: '/placeholder-doctor-1.jpg'
    },
    {
      name: 'Dr. Michael Rodriguez',
      role: 'Medical Director',
      bio: 'Specializes in Family Medicine with a focus on preventive care and chronic disease management using data-driven approaches.',
      imagePath: '/placeholder-doctor-2.jpg'
    },
    {
      name: 'Aisha Johnson',
      role: 'Head of Patient Experience',
      bio: 'With a background in healthcare administration and patient advocacy, Aisha leads our efforts to create seamless, compassionate care journeys.',
      imagePath: '/placeholder-staff-1.jpg'
    },
    {
      name: 'Dr. James Wilson',
      role: 'AI Research Lead',
      bio: 'Combines expertise in machine learning and clinical practice to develop innovative solutions that enhance medical decision-making.',
      imagePath: '/placeholder-doctor-3.jpg'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold text-white">
          About <span className="text-[#00f5ff]">Praxis AI Medical</span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-white/80">
          Revolutionizing healthcare through AI-powered solutions that enhance the patient experience
          and improve clinical outcomes.
        </p>
      </motion.div>

      <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-white">
            Our <span className="text-[#00f5ff]">Mission</span>
          </h2>
          <p className="mb-4 text-white/80">
            At Praxis AI Medical, we're committed to transforming healthcare delivery through
            intelligent technology that puts patients first. We believe that by combining
            cutting-edge AI with compassionate care, we can create a healthcare experience
            that is more efficient, personalized, and effective.
          </p>
          <p className="text-white/80">
            Our platform streamlines administrative processes, enhances clinical decision-making,
            and empowers patients to take an active role in their health journey. By reducing
            barriers to care and improving communication between providers and patients,
            we're building a future where quality healthcare is accessible to all.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-xl p-6"
        >
          <h2 className="mb-6 text-3xl font-bold text-white">
            Our <span className="text-[#00f5ff]">Values</span>
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="mr-4 rounded-full bg-[#00f5ff]/20 p-2">
                <span className="text-xl text-[#00f5ff]">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Innovation</h3>
                <p className="text-white/80">Continuously pushing boundaries to improve healthcare delivery</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-4 rounded-full bg-[#00f5ff]/20 p-2">
                <span className="text-xl text-[#00f5ff]">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Compassion</h3>
                <p className="text-white/80">Treating every patient with empathy and respect</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-4 rounded-full bg-[#00f5ff]/20 p-2">
                <span className="text-xl text-[#00f5ff]">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Excellence</h3>
                <p className="text-white/80">Committing to the highest standards in everything we do</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-4 rounded-full bg-[#00f5ff]/20 p-2">
                <span className="text-xl text-[#00f5ff]">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Accessibility</h3>
                <p className="text-white/80">Making quality healthcare available to everyone</p>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-20"
      >
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          Our <span className="text-[#00f5ff]">Team</span>
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass overflow-hidden rounded-xl"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="relative h-64 w-full bg-gradient-to-b from-[#8a2be2]/30 to-[#00f5ff]/30">
                {/* Replace with actual images when available */}
                <div className="flex h-full items-center justify-center">
                  <span className="text-4xl text-white/50">👤</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="mb-2 text-[#00f5ff]">{member.role}</p>
                <p className="text-sm text-white/80">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="glass mx-auto max-w-4xl rounded-xl p-8 text-center"
      >
        <h2 className="mb-6 text-3xl font-bold text-white">
          Join Us in <span className="text-[#00f5ff]">Transforming Healthcare</span>
        </h2>
        <p className="mb-8 text-lg text-white/80">
          Whether you're a patient seeking better care or a healthcare professional looking
          to enhance your practice, Praxis AI Medical is here to support your journey.
        </p>
        <a
          href="/contact"
          className="inline-block rounded-full bg-gradient-to-r from-[#8a2be2] to-[#00f5ff] px-8 py-3 text-lg font-medium text-white transition-transform hover:scale-105"
        >
          Get in Touch
        </a>
      </motion.div>
    </main>
  );
};

export default AboutPage;