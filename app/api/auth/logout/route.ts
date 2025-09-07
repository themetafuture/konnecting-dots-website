import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Sign out the user
    const { error } = await supabase.auth.signOut()

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.message
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: 'Logout successful'
    })

  } catch (error: any) {
    console.error('Logout error:', error)
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Logout failed'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed'
  }, { status: 405 })
}