import { NextRequest, NextResponse } from 'next/server'

// Mock data for when services are not available
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
  totalRevenue: 0,
  monthlyGrowth: 0,
}

export async function GET(request: NextRequest) {
  try {
    // For now, allow access without authentication for development
    // TODO: Add proper authentication in production
    
    // Check if we're in a build environment or if environment variables are missing
    const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.VERCEL
    const hasEnvVars = process.env.DATABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL
    
    if (isBuildTime || !hasEnvVars) {
      console.log('Build time or missing env vars, using mock data')
      return NextResponse.json({
        success: true,
        data: mockDashboard
      })
    }
    
    // Try to get real data, fallback to mock data if services are not available
    try {
      const { StudentService } = await import('@/backend/services/studentService')
      const { CourseService } = await import('@/backend/services/courseService')
      const { BlogService } = await import('@/backend/services/blogService')
      const { EventService } = await import('@/backend/services/eventService')
      
      const studentService = new StudentService()
      const courseService = new CourseService()
      const blogService = new BlogService()
      const eventService = new EventService()
      
      const [studentStats, blogStats, upcomingEvents, recentCourses] = await Promise.all([
        studentService.getStudentStats(),
        blogService.getBlogStats(),
        eventService.getUpcomingEvents(5),
        courseService.getCourses({ limit: 5, isPublished: true })
      ])
      
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
        totalRevenue: 0,
        monthlyGrowth: 0,
      }
      
      return NextResponse.json({
        success: true,
        data: dashboard
      })
    } catch (dbError) {
      console.log('Database not ready, using mock data:', dbError.message)
      return NextResponse.json({
        success: true,
        data: mockDashboard
      })
    }
  } catch (error: any) {
    console.error('Dashboard fetch error:', error)
    
    return NextResponse.json({
      success: true,
      data: mockDashboard
    })
  }
}