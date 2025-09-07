import { NextRequest, NextResponse } from 'next/server'

// Temporarily disabled during build to avoid environment variable validation issues
// This route will be re-enabled after successful deployment

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: false,
    error: 'Authentication service temporarily unavailable'
  }, { status: 503 })
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({
    success: false,
    error: 'Authentication service temporarily unavailable'
  }, { status: 503 })
}

/* 
// Original implementation - will be restored after deployment
import { AuthService } from '@/backend/services/authService'
import { verifyToken, extractTokenFromHeader } from '@/backend/utils/auth'

const authService = new AuthService()

export async function GET(request: NextRequest) {
  try {
    // Extract token from cookie or header
    const token = request.cookies.get('auth-token')?.value || 
                  extractTokenFromHeader(request.headers.get('authorization') || undefined)
    
    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 })
    }
    
    // Verify token
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({
        success: false,
        error: 'Invalid or expired token'
      }, { status: 401 })
    }
    
    // Get user profile
    const user = await authService.getProfile(payload.userId)
    
    return NextResponse.json({
      success: true,
      data: user
    })
  } catch (error: any) {
    console.error('Profile fetch error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch profile'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Extract token from cookie or header
    const token = request.cookies.get('auth-token')?.value || 
                  extractTokenFromHeader(request.headers.get('authorization') || undefined)
    
    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 })
    }
    
    // Verify token
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({
        success: false,
        error: 'Invalid or expired token'
      }, { status: 401 })
    }
    
    const body = await request.json()
    
    // Update user profile
    const user = await authService.updateProfile(payload.userId, body)
    
    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    })
  } catch (error: any) {
    console.error('Profile update error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to update profile'
    }, { status: 500 })
  }
}
*/