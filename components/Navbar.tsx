'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass sticky top-0 z-50 w-full py-4 bg-gradient-to-r from-[#0a041c]/90 to-[#8a2be2]/30">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-white">
            <span className="text-[#00f5ff]">Praxis</span>
            <span className="text-xs align-top">©</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden space-x-8 md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/schedule">Schedule</NavLink>
          <NavLink href="/intake">Intake Form</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/faq">FAQ</NavLink>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8a2be2]/20 text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={cn('transition-all', isOpen ? 'hidden' : 'block')}>☰</span>
          <span className={cn('transition-all', isOpen ? 'block' : 'hidden')}>✕</span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
          display: isOpen ? "block" : "none"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30,
          opacity: { duration: 0.2 } 
        }}
        className="glass absolute left-0 right-0 z-40 mt-2 max-h-[80vh] overflow-y-auto px-4 py-0 md:hidden scrollbar-thin scrollbar-thumb-gradient scrollbar-track-[#8a2be2]/10 bg-gradient-to-b from-[#0a041c]/90 to-[#8a2be2]/30"
      >
        <motion.div 
          className="space-y-4 py-6"
          variants={{
            open: { opacity: 1, y: 0 },
            closed: { opacity: 0, y: -20 }
          }}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={{ staggerChildren: 0.05, delayChildren: 0.05 }}
        >
          <MobileNavLink href="/" onClick={() => setIsOpen(false)}>
            Home
          </MobileNavLink>
          <MobileNavLink href="/schedule" onClick={() => setIsOpen(false)}>
            Schedule
          </MobileNavLink>
          <MobileNavLink href="/intake" onClick={() => setIsOpen(false)}>
            Intake Form
          </MobileNavLink>
          <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>
            About
          </MobileNavLink>
          <MobileNavLink href="/services" onClick={() => setIsOpen(false)}>
            Services
          </MobileNavLink>
          <MobileNavLink href="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </MobileNavLink>
          <MobileNavLink href="/faq" onClick={() => setIsOpen(false)}>
            FAQ
          </MobileNavLink>
        </motion.div>
      </motion.div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link
        href={href}
        className="group relative text-sm font-medium text-white transition-colors hover:text-[#00f5ff]"
      >
        {children}
        <motion.span 
          className="absolute -bottom-1 left-0 h-[2px] bg-[#00f5ff]" 
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.2 }}
        />
      </Link>
    </motion.div>
  );
};

const MobileNavLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, x: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link
        href={href}
        onClick={onClick}
        className="block rounded-md px-4 py-2 text-center text-white transition-colors hover:bg-gradient-to-r hover:from-[#8a2be2]/30 hover:to-[#00f5ff]/30 hover:text-[#00f5ff]"
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default Navbar;