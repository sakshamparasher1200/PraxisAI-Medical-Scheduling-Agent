import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import twilio from 'twilio';
import { patients, doctors, locations } from '@/lib/data';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Initialize Twilio
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

async function sendEmailConfirmation(patientEmail: string, appointmentDetails: any) {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('SendGrid API key not found, skipping email');
      return { success: true, mock: true };
    }

    const doctor = doctors.find(d => d.id === appointmentDetails.doctorId);
    const location = locations.find(l => l.id === appointmentDetails.locationId);

    const msg = {
      to: patientEmail,
      from: 'appointments@praxis-medical.com',
      subject: 'Your Appointment Confirmation - Praxis Medical',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background-color: #0a041c; padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0; color: #00f5ff;">Praxis Medical</h1>
            <p style="margin: 10px 0 0; font-size: 18px;">Appointment Confirmation</p>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9; border-radius: 0 0 4px 4px;">
            <p>Dear Patient,</p>
            <p>Your appointment has been successfully scheduled:</p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #8a2be2; margin: 20px 0;">
              <p><strong>Doctor:</strong> ${doctor?.name || 'Not specified'}</p>
              <p><strong>Date:</strong> ${appointmentDetails.date}</p>
              <p><strong>Time:</strong> ${appointmentDetails.time}</p>
              <p><strong>Duration:</strong> ${appointmentDetails.duration} minutes</p>
              <p><strong>Location:</strong> ${location?.name || 'Not specified'}</p>
              <p><strong>Address:</strong> ${location?.address || ''}, ${location?.city || ''}, ${location?.state || ''} ${location?.zip || ''}</p>
            </div>
            <p>Please arrive 15 minutes before your scheduled appointment time.</p>
            <p>If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance.</p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="#" style="background-color: #8a2be2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Manage Appointment</a>
            </div>
            <p style="margin-top: 30px;">Thank you for choosing Praxis Medical.</p>
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending email confirmation:', error);
    return { success: false, error };
  }
}

async function sendSMSConfirmation(patientPhone: string, appointmentDetails: any) {
  try {
    if (!twilioClient) {
      console.log('Twilio credentials not found, skipping SMS');
      return { success: true, mock: true };
    }

    const doctor = doctors.find(d => d.id === appointmentDetails.doctorId);
    const formattedDate = new Date(appointmentDetails.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const message = await twilioClient.messages.create({
      body: `Praxis Medical: Your appointment with ${doctor?.name} is confirmed for ${formattedDate} at ${appointmentDetails.time}. Reply CONFIRM to confirm or CANCEL to cancel.`,
      from: '+18005551234', // This would be your Twilio phone number
      to: patientPhone,
    });

    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error('Error sending SMS confirmation:', error);
    return { success: false, error };
  }
}

export async function POST(request: Request) {
  try {
    const { patientId, appointmentId, notificationType } = await request.json();

    if (!patientId || !appointmentId) {
      return NextResponse.json(
        { error: 'Patient ID and appointment ID are required' },
        { status: 400 }
      );
    }

    // Find the patient
    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    // In a real app, we would fetch the appointment from the database
    // For now, we'll create a mock appointment
    const mockAppointment = {
      id: appointmentId,
      patientId,
      doctorId: '1', // Using the first doctor as default
      locationId: '1', // Using the first location as default
      date: '2023-12-15',
      time: '10:00 AM',
      duration: 30,
      status: 'scheduled',
      confirmationStatus: 'pending',
      remindersSent: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const results: any = {};

    // Send notifications based on the requested type
    if (notificationType === 'email' || notificationType === 'both') {
      results.email = await sendEmailConfirmation(patient.email, mockAppointment);
    }

    if (notificationType === 'sms' || notificationType === 'both') {
      results.sms = await sendSMSConfirmation(patient.phone, mockAppointment);
    }

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    console.error('Error sending notifications:', error);
    return NextResponse.json(
      { error: 'Failed to send notifications' },
      { status: 500 }
    );
  }
}