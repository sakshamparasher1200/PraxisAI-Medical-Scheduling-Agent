'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="relative mb-24 flex min-h-[80vh] flex-col items-center justify-center text-center">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[40%] left-[20%] h-[500px] w-[500px] rounded-full bg-[#8a2be2] opacity-20 blur-[100px]" />
          <div className="absolute -bottom-[10%] right-[10%] h-[300px] w-[300px] rounded-full bg-[#00f5ff] opacity-20 blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
        >
          <h1>
            <span className="text-white">Praxis</span>
            <span className="text-xs align-top">©</span>
            <span className="block bg-gradient-to-r from-[#8a2be2] to-[#00f5ff] bg-clip-text text-transparent">
              AI Medical Scheduling
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 max-w-2xl text-lg text-gray-300"
        >
          Streamline your medical practice with our AI-powered scheduling system. Reduce administrative
          work and provide a seamless experience for your patients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <Link
            href="/schedule"
            className="glow rounded-full bg-gradient-to-r from-[#8a2be2] to-[#00f5ff] px-8 py-3 font-medium text-white transition-all hover:scale-105"
          >
            Schedule Appointment
          </Link>
          <Link
            href="/intake"
            className="rounded-full border border-[#00f5ff] px-8 py-3 font-medium text-white transition-all hover:bg-[#00f5ff]/10"
          >
            Complete Intake Form
          </Link>
        </motion.div>
      </section>

      <section className="mb-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
          <p className="mx-auto max-w-2xl text-gray-300">Our streamlined process makes scheduling medical appointments easier than ever.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: 'Book Online',
              description: 'Fill out a simple form with your information and preferences.',
              icon: '/file.svg',
            },
            {
              title: 'Smart Scheduling',
              description: 'Our AI matches you with the perfect appointment slot based on your needs.',
              icon: '/globe.svg',
            },
            {
              title: 'Automated Reminders',
              description: 'Receive timely notifications to ensure you never miss an appointment.',
              icon: '/window.svg',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 transition-all hover:border-[#00f5ff]/30"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#8a2be2]/20">
                <Image src={feature.icon} alt={feature.title} width={24} height={24} className="text-[#00f5ff]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
