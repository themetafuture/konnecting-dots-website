import { NextRequest, NextResponse } from 'next/server'
import { CourseService } from '../../../../backend/services/courseService'

const courseService = new CourseService()

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const course = await courseService.getCourseBySlug(params.slug)
    
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
