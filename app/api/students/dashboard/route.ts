import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

// Helper function to verify student token
async function verifyStudentToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })
    
    if (!user || user.role !== 'student' || !user.isApproved) {
      return null
    }
    
    return user
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const student = await verifyStudentToken(request)
    if (!student) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 })
    }

    // Get student's enrollments with course details
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: student.id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            durationHours: true,
            price: true,
            status: true
          }
        },
        progress: {
          select: {
            progressPercentage: true,
            status: true
          }
        }
      }
    })

    // Calculate stats
    const totalCourses = enrollments.length
    const completedCourses = enrollments.filter(e => e.status === 'completed').length
    const inProgressCourses = enrollments.filter(e => e.status === 'active').length
    
    const totalHours = enrollments.reduce((sum, e) => sum + e.course.durationHours, 0)
    const completedHours = enrollments
      .filter(e => e.status === 'completed')
      .reduce((sum, e) => sum + e.course.durationHours, 0)

    // Format courses data
    const courses = enrollments.map(enrollment => {
      const avgProgress = enrollment.progress.length > 0 
        ? enrollment.progress.reduce((sum, p) => sum + p.progressPercentage, 0) / enrollment.progress.length
        : 0

      return {
        id: enrollment.course.id,
        title: enrollment.course.title,
        description: enrollment.course.description || '',
        durationHours: enrollment.course.durationHours,
        price: Number(enrollment.course.price),
        status: enrollment.status,
        progress: Math.round(avgProgress),
        enrolledAt: enrollment.enrolledAt.toISOString(),
        completedAt: enrollment.completedAt?.toISOString()
      }
    })

    const dashboardData = {
      student: {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        isApproved: student.isApproved,
        createdAt: student.createdAt.toISOString()
      },
      courses,
      stats: {
        totalCourses,
        completedCourses,
        inProgressCourses,
        totalHours,
        completedHours
      }
    }

    return NextResponse.json({
      success: true,
      data: dashboardData
    })

  } catch (error: any) {
    console.error('Error fetching student dashboard:', error)
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to fetch dashboard data'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
