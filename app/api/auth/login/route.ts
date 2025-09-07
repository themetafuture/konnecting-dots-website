import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/backend/services/authService'

const authService = new AuthService()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await authService.login(body)

    // Set HTTP-only cookie for token
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      data: result
    })

    response.cookies.set('auth-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return response

  } catch (error: any) {
    console.error('Login error:', error)
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Login failed'
    }, { status: error.status || 401 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed'
  }, { status: 405 })
}