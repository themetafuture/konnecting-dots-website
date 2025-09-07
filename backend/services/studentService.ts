import { prisma } from '../config/database'
import { createError } from '../middleware/error'
import { paginationSchema } from '../utils/validation'

export class StudentService {
  async getStudents(query: any) {
    const { page, limit, search, sortBy, sortOrder } = paginationSchema.parse(query)

    const skip = (page - 1) * limit

    const where: any = {
      role: 'STUDENT'
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [students, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy || 'createdAt']: sortOrder },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          avatar: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          enrollments: {
            include: {
              course: {
                select: {
                  id: true,
                  title: true,
                  category: true,
                  level: true,
                }
              }
            }
          },
          payments: {
            select: {
              id: true,
              amount: true,
              status: true,
              createdAt: true,
            }
          }
        }
      }),
      prisma.user.count({ where })
    ])

    // Calculate additional stats for each student
    const studentsWithStats = students.map(student => {
      const totalCourses = student.enrollments.length
      const completedCourses = student.enrollments.filter(e => e.status === 'COMPLETED').length
      const activeCourses = student.enrollments.filter(e => e.status === 'ACTIVE').length
      const averageProgress = totalCourses > 0 
        ? Math.round(student.enrollments.reduce((sum, e) => sum + e.progress, 0) / totalCourses)
        : 0
      const totalSpent = student.payments
        .filter(p => p.status === 'COMPLETED')
        .reduce((sum, p) => sum + p.amount, 0)

      return {
        ...student,
        stats: {
          totalCourses,
          completedCourses,
          activeCourses,
          averageProgress,
          totalSpent,
        }
      }
    })

    return {
      students: studentsWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  async getStudentById(id: string) {
    const student = await prisma.user.findUnique({
      where: { 
        id,
        role: 'STUDENT'
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        avatar: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                description: true,
                category: true,
                level: true,
                price: true,
                duration: true,
                image: true,
              }
            }
          }
        },
        payments: {
          include: {
            course: {
              select: {
                title: true,
              }
            },
            event: {
              select: {
                title: true,
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        sessions: {
          include: {
            enrollment: {
              include: {
                course: {
                  select: {
                    title: true,
                  }
                }
              }
            },
            event: {
              select: {
                title: true,
              }
            }
          },
          orderBy: {
            scheduledAt: 'desc'
          }
        },
        testimonials: {
          select: {
            id: true,
            content: true,
            rating: true,
            createdAt: true,
          }
        }
      }
    })

    if (!student) {
      throw createError('Student not found', 404)
    }

    return student
  }

  async updateStudent(id: string, data: any) {
    const student = await prisma.user.findUnique({
      where: { 
        id,
        role: 'STUDENT'
      }
    })

    if (!student) {
      throw createError('Student not found', 404)
    }

    const updatedStudent = await prisma.user.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        avatar: data.avatar,
        isActive: data.isActive,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        avatar: true,
        isActive: true,
        updatedAt: true,
      }
    })

    return updatedStudent
  }

  async deleteStudent(id: string) {
    const student = await prisma.user.findUnique({
      where: { 
        id,
        role: 'STUDENT'
      }
    })

    if (!student) {
      throw createError('Student not found', 404)
    }

    // Check if student has active enrollments
    const activeEnrollments = await prisma.enrollment.count({
      where: { 
        userId: id,
        status: 'ACTIVE'
      }
    })

    if (activeEnrollments > 0) {
      throw createError('Cannot delete student with active enrollments', 400)
    }

    await prisma.user.delete({
      where: { id }
    })

    return { message: 'Student deleted successfully' }
  }

  async getStudentProgress(id: string) {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            category: true,
            level: true,
            duration: true,
          }
        },
        sessions: {
          select: {
            id: true,
            type: true,
            status: true,
            scheduledAt: true,
            duration: true,
            notes: true,
          },
          orderBy: {
            scheduledAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const progress = enrollments.map(enrollment => {
      const totalSessions = enrollment.sessions.length
      const completedSessions = enrollment.sessions.filter(s => s.status === 'COMPLETED').length
      const totalDuration = enrollment.sessions
        .filter(s => s.status === 'COMPLETED')
        .reduce((sum, s) => sum + s.duration, 0)

      return {
        ...enrollment,
        sessionStats: {
          totalSessions,
          completedSessions,
          totalDuration,
          completionRate: totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0,
        }
      }
    })

    return progress
  }

  async getStudentStats() {
    const [
      totalStudents,
      activeStudents,
      newStudentsThisMonth,
      totalEnrollments,
      completedEnrollments,
      averageProgress,
    ] = await Promise.all([
      prisma.user.count({
        where: { role: 'STUDENT' }
      }),
      prisma.user.count({
        where: { 
          role: 'STUDENT',
          isActive: true
        }
      }),
      prisma.user.count({
        where: {
          role: 'STUDENT',
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      }),
      prisma.enrollment.count(),
      prisma.enrollment.count({
        where: { status: 'COMPLETED' }
      }),
      prisma.enrollment.aggregate({
        _avg: {
          progress: true
        }
      })
    ])

    return {
      totalStudents,
      activeStudents,
      newStudentsThisMonth,
      totalEnrollments,
      completedEnrollments,
      averageProgress: Math.round(averageProgress._avg.progress || 0),
      completionRate: totalEnrollments > 0 ? Math.round((completedEnrollments / totalEnrollments) * 100) : 0,
    }
  }
}
