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

async function sendEmailReminder(patientEmail: string, appointmentDetails: any, reminderType: string) {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('SendGrid API key not found, skipping email reminder');
      return { success: true, mock: true };
    }

    const doctor = doctors.find(d => d.id === appointmentDetails.doctorId);
    const location = locations.find(l => l.id === appointmentDetails.locationId);
    
    let subject = '';
    let urgencyText = '';
    let actionText = '';
    
    switch (reminderType) {
      case '72h':
        subject = 'Upcoming Appointment Reminder - Praxis Medical';
        urgencyText = 'This is a friendly reminder about your upcoming appointment.';
        actionText = 'Please confirm your attendance by clicking the button below.';
        break;
      case '48h':
        subject = 'Please Confirm Your Upcoming Appointment - Praxis Medical';
        urgencyText = 'Your appointment is coming up soon. We haven\'t received your confirmation yet.';
        actionText = 'Please confirm or reschedule your appointment as soon as possible.';
        break;
      case '24h':
        subject = 'URGENT: Appointment Confirmation Required - Praxis Medical';
        urgencyText = 'Your appointment is tomorrow and we still need your confirmation.';
        actionText = 'Please confirm your appointment immediately to avoid cancellation.';
        break;
      default:
        subject = 'Appointment Reminder - Praxis Medical';
        urgencyText = 'This is a reminder about your upcoming appointment.';
        actionText = 'Please confirm your attendance.';
    }

    const msg = {
      to: patientEmail,
      from: 'appointments@praxis-medical.com',
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background-color: #0a041c; padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0; color: #00f5ff;">Praxis Medical</h1>
            <p style="margin: 10px 0 0; font-size: 18px;">Appointment Reminder</p>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9; border-radius: 0 0 4px 4px;">
            <p>Dear Patient,</p>
            <p>${urgencyText}</p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #8a2be2; margin: 20px 0;">
              <p><strong>Doctor:</strong> ${doctor?.name || 'Not specified'}</p>
              <p><strong>Date:</strong> ${appointmentDetails.date}</p>
              <p><strong>Time:</strong> ${appointmentDetails.time}</p>
              <p><strong>Duration:</strong> ${appointmentDetails.duration} minutes</p>
              <p><strong>Location:</strong> ${location?.name || 'Not specified'}</p>
              <p><strong>Address:</strong> ${location?.address || ''}, ${location?.city || ''}, ${location?.state || ''} ${location?.zip || ''}</p>
            </div>
            <p>${actionText}</p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="#confirm" style="background-color: #8a2be2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-right: 10px;">Confirm Appointment</a>
              <a href="#reschedule" style="background-color: #333; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Reschedule</a>
            </div>
            <p style="margin-top: 30px;">Thank you for choosing Praxis Medical.</p>
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending email reminder:', error);
    return { success: false, error };
  }
}

async function sendSMSReminder(patientPhone: string, appointmentDetails: any, reminderType: string) {
  try {
    if (!twilioClient) {
      console.log('Twilio credentials not found, skipping SMS reminder');
      return { success: true, mock: true };
    }

    const doctor = doctors.find(d => d.id === appointmentDetails.doctorId);
    const formattedDate = new Date(appointmentDetails.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    let messageText = '';
    
    switch (reminderType) {
      case '72h':
        messageText = `Praxis Medical: Reminder for your appointment with ${doctor?.name} on ${formattedDate} at ${appointmentDetails.time}. Reply CONFIRM to confirm or RESCHEDULE to reschedule.`;
        break;
      case '48h':
        messageText = `Praxis Medical: Your appointment with ${doctor?.name} is in 2 days (${formattedDate} at ${appointmentDetails.time}). We haven't received your confirmation. Reply CONFIRM or RESCHEDULE.`;
        break;
      case '24h':
        messageText = `URGENT: Your Praxis Medical appointment with ${doctor?.name} is TOMORROW at ${appointmentDetails.time}. Please reply CONFIRM immediately to keep your slot or CANCEL to cancel.`;
        break;
      default:
        messageText = `Praxis Medical: Reminder for your appointment with ${doctor?.name} on ${formattedDate} at ${appointmentDetails.time}. Reply CONFIRM or RESCHEDULE.`;
    }

    const message = await twilioClient.messages.create({
      body: messageText,
      from: '+18005551234', // This would be your Twilio phone number
      to: patientPhone,
    });

    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error('Error sending SMS reminder:', error);
    return { success: false, error };
  }
}

export async function POST(request: Request) {
  try {
    const { patientId, appointmentId, reminderType } = await request.json();

    if (!patientId || !appointmentId || !reminderType) {
      return NextResponse.json(
        { error: 'Patient ID, appointment ID, and reminder type are required' },
        { status: 400 }
      );
    }

    // Validate reminder type
    if (!['72h', '48h', '24h'].includes(reminderType)) {
      return NextResponse.json(
        { error: 'Invalid reminder type. Must be 72h, 48h, or 24h' },
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

    // Send both email and SMS reminders
    const emailResult = await sendEmailReminder(patient.email, mockAppointment, reminderType);
    const smsResult = await sendSMSReminder(patient.phone, mockAppointment, reminderType);

    // In a real app, we would update the appointment record to track reminders sent
    // mockAppointment.remindersSent += 1;
    // mockAppointment.updatedAt = new Date().toISOString();
    // await updateAppointmentInDatabase(mockAppointment);

    return NextResponse.json({
      success: true,
      results: {
        email: emailResult,
        sms: smsResult,
      },
    });
  } catch (error) {
    console.error('Error sending reminders:', error);
    return NextResponse.json(
      { error: 'Failed to send reminders' },
      { status: 500 }
    );
  }
}