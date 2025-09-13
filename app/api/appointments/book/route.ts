import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { patients, doctors, locations } from '@/lib/data';
import { Patient, PatientType } from '@/lib/types';

// Mock function to simulate Calendly API integration
async function bookCalendlyAppointment(doctorCalendlyLink: string, date: string, time: string, duration: number) {
  // In a real implementation, this would make an API call to Calendly
  console.log(`Booking appointment with ${doctorCalendlyLink} on ${date} at ${time} for ${duration} minutes`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return a mock successful response
  return {
    success: true,
    calendlyEventId: `cal-${randomUUID()}`
  };
}
    
export async function POST(request: Request) {
  try {
    const {
      patientId,
      patientType,
      patientData,
      doctorId,
      locationId,
      date,
      time,
    } = await request.json();

    // Validate required fields
    if (!doctorId || !locationId || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required appointment details' },
        { status: 400 }
      );
    }

    // Find the doctor
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }

    // Find the location
    const location = locations.find(l => l.id === locationId);
    if (!location) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }

    // Determine appointment duration based on patient type
    const duration = patientType === 'new' ? 60 : 30;

    // Book the appointment with Calendly (mock)
    const calendlyResponse = await bookCalendlyAppointment(
      doctor.calendlyLink,
      date,
      time,
      duration
    );

    if (!calendlyResponse.success) {
      return NextResponse.json(
        { error: 'Failed to book appointment with Calendly' },
        { status: 500 }
      );
    }

    // Create or get patient
    let patient: Patient | undefined;
    let finalPatientId = patientId;

    if (patientType === 'new' && patientData) {
      // In a real app, we would create a new patient in the database
      // For now, we'll just generate a new ID
      finalPatientId = randomUUID();
      // We would normally save this patient to the database
    } else if (patientType === 'returning') {
      patient = patients.find(p => p.id === patientId);
      if (!patient) {
        return NextResponse.json(
          { error: 'Patient not found' },
          { status: 404 }
        );
      }
    }

    // Create appointment record (in a real app, this would be saved to a database)
    const appointment = {
      id: randomUUID(),
      patientId: finalPatientId,
      doctorId,
      locationId,
      date,
      time,
      duration,
      status: 'scheduled',
      confirmationStatus: 'pending',
      remindersSent: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      appointment,
      calendlyEventId: calendlyResponse.calendlyEventId,
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    return NextResponse.json(
      { error: 'Failed to book appointment' },
      { status: 500 }
    );
  }
}