import { NextRequest, NextResponse } from 'next/server'
import { StudentService } from '../../../../backend/services/studentService'
import { CourseService } from '../../../../backend/services/courseService'
import { BlogService } from '../../../../backend/services/blogService'
import { EventService } from '../../../../backend/services/eventService'

const studentService = new StudentService()
const courseService = new CourseService()
const blogService = new BlogService()
const eventService = new EventService()

export async function GET(request: NextRequest) {
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
    
    // TODO: Verify user has admin role
    
    // Get dashboard data
    const [
      studentStats,
      blogStats,
      upcomingEvents,
      recentCourses
    ] = await Promise.all([
      studentService.getStudentStats(),
      blogService.getBlogStats(),
      eventService.getUpcomingEvents(5),
      courseService.getCourses({ limit: 5, isPublished: true })
    ])
    
    const dashboard = {
      students: studentStats,
      blog: blogStats,
      upcomingEvents,
      recentCourses: recentCourses.courses,
      // Calculate additional metrics
      totalRevenue: 0, // TODO: Calculate from payments
      monthlyGrowth: 0, // TODO: Calculate growth metrics
    }
    
    return NextResponse.json({
      success: true,
      data: dashboard
    })
  } catch (error: any) {
    console.error('Dashboard fetch error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch dashboard data'
    }, { status: 500 })
  }
}
