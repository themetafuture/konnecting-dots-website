import { NextRequest, NextResponse } from 'next/server'
import { CourseService } from '@/backend/services/courseService'

const courseService = new CourseService()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const course = await courseService.getCourseById(params.id)
    
    return NextResponse.json({
      success: true,
      data: course
    })
  } catch (error: any) {
    console.error('Course fetch error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch course'
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const course = await courseService.updateCourse(params.id, body)
    
    return NextResponse.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    })
  } catch (error: any) {
    console.error('Course update error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to update course'
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const result = await courseService.deleteCourse(params.id)
    
    return NextResponse.json({
      success: true,
      message: result.message
    })
  } catch (error: any) {
    console.error('Course deletion error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to delete course'
    }, { status: 500 })
  }
}
