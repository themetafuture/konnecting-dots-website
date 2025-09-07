import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/backend/services/authService'

const authService = new AuthService()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await authService.register(body)

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      data: result
    })

  } catch (error: any) {
    console.error('Registration error:', error)
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to create account'
    }, { status: error.status || 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed'
  }, { status: 405 })
}