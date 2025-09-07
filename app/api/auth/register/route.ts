import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone, role = 'student' } = await request.json()
    
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({
        success: false,
        message: 'Email, password, first name, and last name are required'
      }, { status: 400 })
    }

    const supabase = createClient()
    
    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role: role,
        },
      },
    })

    if (authError) {
      return NextResponse.json({
        success: false,
        message: authError.message
      }, { status: 400 })
    }

    if (authData.user) {
      // Create user profile in users table
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: authData.user.email!,
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          role: role,
        })

      if (userError) {
        console.error('User creation error:', userError)
        // Note: User is created in auth but user profile creation failed
        // In production, you might want to handle this differently
      }

      // Also create profile for backward compatibility
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: authData.user.email!,
          full_name: `${firstName} ${lastName}`,
          role: role,
          phone: phone,
        })

      if (profileError) {
        console.error('Profile creation error:', profileError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.',
      data: {
        user: authData.user,
        session: authData.session
      }
    })

  } catch (error: any) {
    console.error('Registration error:', error)
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Registration failed'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed'
  }, { status: 405 })
}