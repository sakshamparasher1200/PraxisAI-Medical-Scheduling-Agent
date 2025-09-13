import { NextResponse } from 'next/server';
import { patients } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const { fullName, dateOfBirth } = await request.json();

    if (!fullName || !dateOfBirth) {
      return NextResponse.json(
        { error: 'Full name and date of birth are required' },
        { status: 400 }
      );
    }

    // Split the full name into first and last name
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length < 2) {
      return NextResponse.json(
        { error: 'Please provide both first and last name' },
        { status: 400 }
      );
    }

    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];

    // Check if the patient exists in our database
    const existingPatient = patients.find(
      (patient) =>
        patient.firstName.toLowerCase() === firstName.toLowerCase() &&
        patient.lastName.toLowerCase() === lastName.toLowerCase() &&
        patient.dob === dateOfBirth
    );

    if (existingPatient) {
      return NextResponse.json({
        patientType: 'returning',
        patient: {
          id: existingPatient.id,
          firstName: existingPatient.firstName,
          lastName: existingPatient.lastName,
          email: existingPatient.email,
          phone: existingPatient.phone,
        },
      });
    }

    return NextResponse.json({
      patientType: 'new',
    });
  } catch (error) {
    console.error('Error looking up patient:', error);
    return NextResponse.json(
      { error: 'Failed to process patient lookup' },
      { status: 500 }
    );
  }
}