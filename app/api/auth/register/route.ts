import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '../../../../backend/services/authService'
import { validate } from '../../../../backend/middleware/validation'
import { registerSchema } from '../../../../backend/utils/validation'

const authService = new AuthService()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request data
    const validatedData = registerSchema.parse(body)
    
    // Register user
    const result = await authService.register(validatedData)
    
    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      data: result
    }, { status: 201 })
  } catch (error: any) {
    console.error('Registration error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Registration failed'
    }, { status: 500 })
  }
}
