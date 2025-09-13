'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-[#00f5ff]" />,
      title: 'Email Us',
      details: ['contact@praxisai.com', 'support@praxisai.com']
    },
    {
      icon: <Phone className="h-6 w-6 text-[#00f5ff]" />,
      title: 'Call Us',
      details: ['(555) 123-4567', '(555) 987-6543']
    },
    {
      icon: <MapPin className="h-6 w-6 text-[#00f5ff]" />,
      title: 'Visit Us',
      details: ['123 Innovation Drive', 'San Francisco, CA 94103']
    },
    {
      icon: <Clock className="h-6 w-6 text-[#00f5ff]" />,
      title: 'Hours',
      details: ['Monday-Friday: 8am-6pm', 'Saturday: 9am-1pm']
    }
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold text-white">
          Get in <span className="text-[#00f5ff]">Touch</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-white/80">
          Have questions about our services or need assistance? We're here to help.
          Reach out to our team using the contact information below or fill out the form.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="glass rounded-xl p-6">
            <h2 className="mb-6 text-2xl font-bold text-white">Contact Information</h2>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  whileHover={{ x: 5 }}
                >
                  <div className="mr-4 rounded-full bg-[#8a2be2]/20 p-3">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-white/80">{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex space-x-4">
              <a href="#" className="rounded-full bg-[#8a2be2]/20 p-3 text-white hover:bg-[#8a2be2]/40">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="rounded-full bg-[#8a2be2]/20 p-3 text-white hover:bg-[#8a2be2]/40">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="rounded-full bg-[#8a2be2]/20 p-3 text-white hover:bg-[#8a2be2]/40">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="rounded-full bg-[#8a2be2]/20 p-3 text-white hover:bg-[#8a2be2]/40">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-3"
        >
          <div className="glass rounded-xl p-6">
            <h2 className="mb-6 text-2xl font-bold text-white">Send Us a Message</h2>
            
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-lg bg-[#00f5ff]/20 p-6 text-center"
              >
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-[#00f5ff]/30 p-3">
                    <svg className="h-6 w-6 text-[#00f5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-white/80">Thank you for reaching out. We'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/80">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-[#8a2be2]/30 bg-[#8a2be2]/10 p-3 text-white placeholder-white/50 focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/80">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-[#8a2be2]/30 bg-[#8a2be2]/10 p-3 text-white placeholder-white/50 focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white/80">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[#8a2be2]/30 bg-[#8a2be2]/10 p-3 text-white placeholder-white/50 focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-white/80">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-[#8a2be2]/30 bg-[#8a2be2]/10 p-3 text-white focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                    >
                      <option value="" className="bg-gray-900">Select a subject</option>
                      <option value="General Inquiry" className="bg-gray-900">General Inquiry</option>
                      <option value="Appointment" className="bg-gray-900">Appointment</option>
                      <option value="Billing" className="bg-gray-900">Billing</option>
                      <option value="Technical Support" className="bg-gray-900">Technical Support</option>
                      <option value="Other" className="bg-gray-900">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/80">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-[#8a2be2]/30 bg-[#8a2be2]/10 p-3 text-white placeholder-white/50 focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#8a2be2] to-[#00f5ff] px-6 py-3 text-center font-medium text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="mr-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16"
      >
        <div className="glass h-[400px] w-full rounded-xl">
          {/* Replace with actual map component when available */}
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-[#00f5ff]/50" />
              <p className="mt-4 text-lg text-white/80">Interactive map will be displayed here</p>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default ContactPage;