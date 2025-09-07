import { NextRequest, NextResponse } from 'next/server'
import { CourseService } from '@/backend/services/courseService'

const courseService = new CourseService()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())
    
    try {
      const result = await courseService.getCourses(query)
      
      return NextResponse.json({
        success: true,
        data: result
      })
    } catch (dbError) {
      console.log('Database not ready, using mock data:', dbError.message)
      
      // Return mock data for development
      const mockCourses = [
        {
          id: '1',
          title: 'NLP Practitioner Certification',
          category: 'NLP',
          price: 2500,
          status: 'PUBLISHED',
          isPublished: true,
          _count: {
            enrollments: 15,
            events: 3
          }
        },
        {
          id: '2',
          title: 'Hypnosis Mastery',
          category: 'HYPNOSIS',
          price: 1800,
          status: 'PUBLISHED',
          isPublished: true,
          _count: {
            enrollments: 8,
            events: 2
          }
        },
        {
          id: '3',
          title: 'Corporate Training Program',
          category: 'CORPORATE_TRAINING',
          price: 5000,
          status: 'PUBLISHED',
          isPublished: true,
          _count: {
            enrollments: 5,
            events: 1
          }
        }
      ]

      return NextResponse.json({
        success: true,
        data: {
          courses: mockCourses,
          pagination: {
            page: 1,
            limit: 10,
            total: 3,
            pages: 1
          }
        }
      })
    }
  } catch (error: any) {
    console.error('Courses fetch error:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch courses'
    }, { status: error.status || 500 })
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
    const course = await courseService.createCourse(body)
    
    return NextResponse.json({
      success: true,
      message: 'Course created successfully',
      data: course
    }, { status: 201 })
  } catch (error: any) {
    console.error('Course creation error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to create course'
    }, { status: 500 })
  }
}
