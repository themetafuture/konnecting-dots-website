import { NextRequest, NextResponse } from 'next/server'
import { EventService } from '../../../../backend/services/eventService'

const eventService = new EventService()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const events = await eventService.getUpcomingEvents(limit)
    
    return NextResponse.json({
      success: true,
      data: events
    })
  } catch (error: any) {
    console.error('Upcoming events fetch error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch upcoming events'
    }, { status: 500 })
  }
}
