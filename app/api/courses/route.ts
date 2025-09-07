import { NextRequest, NextResponse } from 'next/server'
import { CourseService } from '../../../../backend/services/courseService'

const courseService = new CourseService()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())
    
    const result = await courseService.getCourses(query)
    
    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error: any) {
    console.error('Courses fetch error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch courses'
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
