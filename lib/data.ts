import { Patient, Doctor, Location } from './types';

/**
 * Synthetic data for the Praxis application
 */

// Generate 50 synthetic patients
export const patients: Patient[] = Array.from({ length: 50 }, (_, i) => {
  const id = (i + 1).toString().padStart(3, '0');
  const firstName = [
    'John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Jennifer', 'William', 'Linda',
    'James', 'Patricia', 'Richard', 'Barbara', 'Joseph', 'Susan', 'Thomas', 'Jessica', 'Charles', 'Karen',
    'Daniel', 'Nancy', 'Matthew', 'Lisa', 'Anthony', 'Betty', 'Mark', 'Dorothy', 'Donald', 'Sandra',
    'Steven', 'Ashley', 'Paul', 'Kimberly', 'Andrew', 'Donna', 'Joshua', 'Michelle', 'Kenneth', 'Carol',
    'Kevin', 'Amanda', 'Brian', 'Melissa', 'George', 'Deborah', 'Edward', 'Stephanie', 'Ronald', 'Rebecca'
  ][i];
  
  const lastName = [
    'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson',
    'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King',
    'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter',
    'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins'
  ][i];
  
  // Generate a random date of birth between 1950 and 2000
  const year = Math.floor(Math.random() * (2000 - 1950 + 1)) + 1950;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  const dob = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
  const phone = `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
  
  const createdAt = new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString();
  const updatedAt = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString();
  
  return {
    id,
    firstName,
    lastName,
    dob,
    email,
    phone,
    createdAt,
    updatedAt,
  };
});

// Create 3 doctors
export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Family Medicine',
    calendlyLink: 'sarah-johnson',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    calendlyLink: 'michael-chen',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Dr. Amara Patel',
    specialty: 'Pediatrics',
    calendlyLink: 'amara-patel',
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop',
  },
];

// Create 3 locations
export const locations: Location[] = [
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