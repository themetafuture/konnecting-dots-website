import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { EmailService } from '@/backend/services/emailService'

const prisma = new PrismaClient()
const emailService = new EmailService()

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone, role = 'student' } = await request.json()
    
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({
        success: false,
        message: 'Email, password, first name, and last name are required'
      }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'User with this email already exists'
      }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user in database (not approved yet)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role,
        isActive: false, // Not active until approved
        emailVerified: false,
        isApproved: false,
      }
    })

    // Create student approval request
    await prisma.studentApproval.create({
      data: {
        studentId: user.id,
        status: 'pending',
      }
    })

    // Send notification to super admin
    const superAdmin = await prisma.user.findFirst({
      where: { role: 'super_admin' }
    })
    
    if (superAdmin) {
      await emailService.sendNewStudentNotification(
        superAdmin.email,
        `${firstName} ${lastName}`,
        email
      )
    }
    
    console.log(`New student registration pending approval: ${email}`)

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Your account is pending approval from the administrator. You will receive an email once approved.',
      data: {
        userId: user.id,
        email: user.email,
        status: 'pending_approval'
      }
    })

  } catch (error: any) {
    console.error('Registration error:', error)
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Registration failed'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed'
  }, { status: 405 })
}