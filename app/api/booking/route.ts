import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/config/database'
import { z } from 'zod'

const bookingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  service: z.string().min(1, 'Service selection is required'),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = bookingSchema.parse(body)

    // Create a new session booking
    const session = await prisma.session.create({
      data: {
        userId: 'temp-user-id', // This would be replaced with actual user ID when logged in
        type: 'CONSULTATION',
        status: 'SCHEDULED',
        scheduledAt: validatedData.preferredDate ? new Date(validatedData.preferredDate) : new Date(),
        duration: 60, // Default 60 minutes
        notes: `Service: ${validatedData.service}\nMessage: ${validatedData.message || 'No additional message'}\nContact: ${validatedData.email}, ${validatedData.phone}`,
      },
    })

    // TODO: Send email confirmation to user
    // TODO: Send notification to admin
    // TODO: Add to calendar system

    return NextResponse.json({
      success: true,
      message: 'Your session has been booked! We will contact you within 24 hours to confirm the details.',
      data: { 
        sessionId: session.id,
        scheduledAt: session.scheduledAt
      }
    })

  } catch (error) {
    console.error('Booking error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Please check your input and try again.',
        errors: error.errors
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to book session. Please try again later.'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed'
  }, { status: 405 })
}
