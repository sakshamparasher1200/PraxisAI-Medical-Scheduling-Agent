import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { appointmentId, confirmationStatus } = await request.json();

    if (!appointmentId || !confirmationStatus) {
      return NextResponse.json(
        { error: 'Appointment ID and confirmation status are required' },
        { status: 400 }
      );
    }

    // Validate confirmation status
    if (!['confirmed', 'declined', 'rescheduled'].includes(confirmationStatus)) {
      return NextResponse.json(
        { error: 'Invalid confirmation status. Must be confirmed, declined, or rescheduled' },
        { status: 400 }
      );
    }

    // In a real app, we would update the appointment in the database
    // For now, we'll just return a success response
    
    return NextResponse.json({
      success: true,
      appointmentId,
      confirmationStatus,
      message: `Appointment ${confirmationStatus} successfully`,
    });
  } catch (error) {
    console.error('Error confirming appointment:', error);
    return NextResponse.json(
      { error: 'Failed to confirm appointment' },
      { status: 500 }
    );
  }
}