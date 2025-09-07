import { NextRequest, NextResponse } from 'next/server'
import { StudentService } from '@/backend/services/studentService'

const studentService = new StudentService()

export async function GET(
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
    
    const student = await studentService.getStudentById(params.id)
    
    return NextResponse.json({
      success: true,
      data: student
    })
  } catch (error: any) {
    console.error('Student fetch error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch student'
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
    const student = await studentService.updateStudent(params.id, body)
    
    return NextResponse.json({
      success: true,
      message: 'Student updated successfully',
      data: student
    })
  } catch (error: any) {
    console.error('Student update error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to update student'
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
    
    const result = await studentService.deleteStudent(params.id)
    
    return NextResponse.json({
      success: true,
      message: result.message
    })
  } catch (error: any) {
    console.error('Student deletion error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to delete student'
    }, { status: 500 })
  }
}
