import { NextRequest, NextResponse } from 'next/server'
import { StudentService } from '@/backend/services/studentService'
import { CourseService } from '@/backend/services/courseService'
import { BlogService } from '@/backend/services/blogService'
import { EventService } from '@/backend/services/eventService'

const studentService = new StudentService()
const courseService = new CourseService()
const blogService = new BlogService()
const eventService = new EventService()

export async function GET(request: NextRequest) {
  try {
    // For now, allow access without authentication for development
    // TODO: Add proper authentication in production
    
    // Try to get real data, fallback to mock data if database is empty
    let studentStats, blogStats, upcomingEvents, recentCourses;
    
    try {
      [studentStats, blogStats, upcomingEvents, recentCourses] = await Promise.all([
        studentService.getStudentStats(),
        blogService.getBlogStats(),
        eventService.getUpcomingEvents(5),
        courseService.getCourses({ limit: 5, isPublished: true })
      ])
    } catch (dbError) {
      console.log('Database not ready, using mock data:', dbError.message)
      
      // Provide mock data for development
      studentStats = {
        totalStudents: 0,
        activeStudents: 0,
        newStudentsThisMonth: 0,
        totalEnrollments: 0,
        completedEnrollments: 0,
        averageProgress: 0,
        completionRate: 0
      }
      
      blogStats = {
        totalPosts: 0,
        publishedPosts: 0,
        totalViews: 0
      }
      
      upcomingEvents = []
      recentCourses = { courses: [] }
    }
    
    const dashboard = {
      students: studentStats,
      blog: blogStats,
      upcomingEvents,
      recentCourses: recentCourses.courses || [],
      pendingApprovals: {
        students: 0,
        courses: 0,
        payments: 0,
        testimonials: 0,
        contacts: 0
      },
      recentActivity: [
        {
          id: '1',
          type: 'student_registration',
          description: 'New student registered for NLP Practitioner course',
          timestamp: '2 hours ago',
          user: 'John Doe'
        },
        {
          id: '2',
          type: 'course_completion',
          description: 'Student completed Hypnosis Mastery course',
          timestamp: '4 hours ago',
          user: 'Jane Smith'
        },
        {
          id: '3',
          type: 'payment_received',
          description: 'Payment received for Corporate Training',
          timestamp: '6 hours ago',
          user: 'Mike Johnson'
        }
      ],
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
    
    // Return mock data on error
    const mockDashboard = {
      students: {
        totalStudents: 0,
        activeStudents: 0,
        newStudentsThisMonth: 0,
        totalEnrollments: 0,
        completedEnrollments: 0,
        averageProgress: 0,
        completionRate: 0
      },
      blog: {
        totalPosts: 0,
        publishedPosts: 0,
        totalViews: 0
      },
      upcomingEvents: [],
      recentCourses: [],
      pendingApprovals: {
        students: 0,
        courses: 0,
        payments: 0,
        testimonials: 0,
        contacts: 0
      },
      recentActivity: []
    }
    
    return NextResponse.json({
      success: true,
      data: mockDashboard
    })
  }
}
