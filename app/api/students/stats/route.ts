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
    
    const stats = await studentService.getStudentStats()
    
    return NextResponse.json({
      success: true,
      data: stats
    })
  } catch (error: any) {
    console.error('Student stats fetch error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch student stats'
    }, { status: 500 })
  }
}
