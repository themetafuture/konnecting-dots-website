import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/config/database'

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Test basic queries
    const userCount = await prisma.user.count()
    const courseCount = await prisma.course.count()
    const blogCount = await prisma.blogPost.count()
    const eventCount = await prisma.event.count()
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      counts: {
        users: userCount,
        courses: courseCount,
        blogPosts: blogCount,
        events: eventCount,
      },
      environment: process.env.NODE_ENV || 'development',
    }
    
    return NextResponse.json({
      success: true,
      data: health
    })
  } catch (error: any) {
    console.error('Health check failed:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Health check failed',
      details: error.message
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
