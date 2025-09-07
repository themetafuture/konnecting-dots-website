import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '../../../../backend/services/authService'
import { loginSchema } from '../../../../backend/utils/validation'

const authService = new AuthService()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request data
    const validatedData = loginSchema.parse(body)
    
    // Login user
    const result = await authService.login(validatedData)
    
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
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Login failed'
    }, { status: 500 })
  }
}
