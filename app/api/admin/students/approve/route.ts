import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { EmailService } from '@/backend/services/emailService'

const prisma = new PrismaClient()
const emailService = new EmailService()

// Helper function to verify admin token
async function verifyAdminToken(request: NextRequest) {
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
    
    if (!user || !['super_admin', 'admin', 'manager'].includes(user.role)) {
      return null
    }
    
    return user
  } catch (error) {
    return null
  }
}

// Get pending student approvals
export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdminToken(request)
    if (!admin) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 })
    }

    const pendingApprovals = await prisma.studentApproval.findMany({
      where: { status: 'pending' },
      include: {
        student: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            createdAt: true,
          }
        }
      },
      orderBy: { requestedAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: pendingApprovals
    })

  } catch (error: any) {
    console.error('Error fetching pending approvals:', error)
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to fetch pending approvals'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// Approve or reject student
export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdminToken(request)
    if (!admin) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 })
    }

    // Only super admin can approve students
    if (admin.role !== 'super_admin') {
      return NextResponse.json({
        success: false,
        message: 'Only super admin can approve students'
      }, { status: 403 })
    }

    const { studentId, action, notes } = await request.json()
    
    if (!studentId || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({
        success: false,
        message: 'Student ID and action (approve/reject) are required'
      }, { status: 400 })
    }

    // Find the student approval request
    const approval = await prisma.studentApproval.findFirst({
      where: { 
        studentId,
        status: 'pending'
      },
      include: { student: true }
    })

    if (!approval) {
      return NextResponse.json({
        success: false,
        message: 'Student approval request not found'
      }, { status: 404 })
    }

    // Update the approval request
    await prisma.studentApproval.update({
      where: { id: approval.id },
      data: {
        status: action === 'approve' ? 'approved' : 'rejected',
        reviewedAt: new Date(),
        reviewedBy: admin.id,
        notes
      }
    })

    if (action === 'approve') {
      // Update student status
      await prisma.user.update({
        where: { id: studentId },
        data: {
          isApproved: true,
          isActive: true,
          approvedAt: new Date(),
          approvedBy: admin.id
        }
      })

      // Send approval email to student
      await emailService.sendStudentApprovalEmail(
        approval.student.email,
        `${approval.student.firstName} ${approval.student.lastName}`,
        true
      )
      console.log(`Student ${approval.student.email} has been approved by ${admin.email}`)
    } else {
      // Send rejection email to student
      await emailService.sendStudentApprovalEmail(
        approval.student.email,
        `${approval.student.firstName} ${approval.student.lastName}`,
        false
      )
      console.log(`Student ${approval.student.email} has been rejected by ${admin.email}`)
    }

    return NextResponse.json({
      success: true,
      message: `Student ${action === 'approve' ? 'approved' : 'rejected'} successfully`
    })

  } catch (error: any) {
    console.error('Error processing student approval:', error)
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to process student approval'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
