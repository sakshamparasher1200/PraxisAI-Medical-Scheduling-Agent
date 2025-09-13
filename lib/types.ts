/**
 * Data models for the Praxis application
 */

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  dob: string; // ISO format: YYYY-MM-DD
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  calendlyLink: string;
  imageUrl?: string;
};

export type Location = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
};

export type Appointment = {
  id: string;
  patientId: string;
  doctorId: string;
  locationId: string;
  date: string; // ISO format: YYYY-MM-DD
  time: string; // Format: HH:MM
  duration: number; // in minutes
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  confirmationStatus: 'pending' | 'confirmed' | 'declined';
  remindersSent: number;
  createdAt: string;
  updatedAt: string;
};

export type ReminderLog = {
  id: string;
  appointmentId: string;
  type: 'email' | 'sms';
  status: 'sent' | 'failed';
  sentAt: string;
  response?: string;
};

export type PatientType = 'new' | 'returning';