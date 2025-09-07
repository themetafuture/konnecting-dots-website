import { NextRequest, NextResponse } from 'next/server'
import { StudentService } from '@/backend/services/studentService'

const studentService = new StudentService()

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
    
    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())
    
    const result = await studentService.getStudents(query)
    
    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error: any) {
    console.error('Students fetch error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch students'
    }, { status: 500 })
  }
}
