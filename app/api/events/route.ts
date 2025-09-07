import { NextRequest, NextResponse } from 'next/server'
import { EventService } from '../../../../backend/services/eventService'

const eventService = new EventService()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())
    
    const result = await eventService.getEvents(query)
    
    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error: any) {
    console.error('Events fetch error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch events'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Extract token from cookie or header
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 })
    }
    
    const body = await request.json()
    const event = await eventService.createEvent(body)
    
    return NextResponse.json({
      success: true,
      message: 'Event created successfully',
      data: event
    }, { status: 201 })
  } catch (error: any) {
    console.error('Event creation error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to create event'
    }, { status: 500 })
  }
}
