import { prisma } from '../config/database'
import { createError } from '../middleware/error'
import { createCourseSchema, updateCourseSchema, courseQuerySchema } from '../utils/validation'

export class CourseService {
  async createCourse(data: any) {
    const validatedData = createCourseSchema.parse(data)
    
    // Generate slug from title
    const slug = validatedData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const course = await prisma.course.create({
      data: {
        ...validatedData,
        slug,
      },
      include: {
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              }
            }
          }
        }
      }
    })

    return course
  }

  async getCourses(query: any) {
    const { page, limit, search, category, level, status, isPublished, sortBy, sortOrder } = 
      courseQuerySchema.parse(query)

    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (category) where.category = category
    if (level) where.level = level
    if (status) where.status = status
    if (isPublished !== undefined) where.isPublished = isPublished

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy || 'createdAt']: sortOrder },
        include: {
          enrollments: {
            select: {
              id: true,
              status: true,
              progress: true,
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                }
              }
            }
          },
          _count: {
            select: {
              enrollments: true,
              events: true,
            }
          }
        }
      }),
      prisma.course.count({ where })
    ])

    return {
      courses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  async getCourseById(id: string) {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              }
            }
          }
        },
        events: {
          where: {
            status: 'SCHEDULED'
          },
          orderBy: {
            startDate: 'asc'
          }
        },
        _count: {
          select: {
            enrollments: true,
            events: true,
          }
        }
      }
    })

    if (!course) {
      throw createError('Course not found', 404)
    }

    return course
  }

  async getCourseBySlug(slug: string) {
    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              }
            }
          }
        },
        events: {
          where: {
            status: 'SCHEDULED'
          },
          orderBy: {
            startDate: 'asc'
          }
        },
        _count: {
          select: {
            enrollments: true,
            events: true,
          }
        }
      }
    })

    if (!course) {
      throw createError('Course not found', 404)
    }

    return course
  }

  async updateCourse(id: string, data: any) {
    const validatedData = updateCourseSchema.parse(data)

    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id }
    })

    if (!existingCourse) {
      throw createError('Course not found', 404)
    }

    // Update slug if title changed
    let updateData = { ...validatedData }
    if (validatedData.title && validatedData.title !== existingCourse.title) {
      updateData.slug = validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    const course = await prisma.course.update({
      where: { id },
      data: updateData,
      include: {
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              }
            }
          }
        }
      }
    })

    return course
  }

  async deleteCourse(id: string) {
    const course = await prisma.course.findUnique({
      where: { id }
    })

    if (!course) {
      throw createError('Course not found', 404)
    }

    // Check if course has enrollments
    const enrollmentCount = await prisma.enrollment.count({
      where: { courseId: id }
    })

    if (enrollmentCount > 0) {
      throw createError('Cannot delete course with active enrollments', 400)
    }

    await prisma.course.delete({
      where: { id }
    })

    return { message: 'Course deleted successfully' }
  }

  async publishCourse(id: string) {
    const course = await prisma.course.update({
      where: { id },
      data: { 
        isPublished: true,
        status: 'PUBLISHED'
      }
    })

    return course
  }

  async unpublishCourse(id: string) {
    const course = await prisma.course.update({
      where: { id },
      data: { 
        isPublished: false,
        status: 'DRAFT'
      }
    })

    return course
  }

  async getCourseStats(id: string) {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        enrollments: {
          select: {
            status: true,
            progress: true,
            createdAt: true,
            completedAt: true,
          }
        },
        payments: {
          select: {
            amount: true,
            status: true,
            createdAt: true,
          }
        }
      }
    })

    if (!course) {
      throw createError('Course not found', 404)
    }

    const stats = {
      totalEnrollments: course.enrollments.length,
      activeEnrollments: course.enrollments.filter(e => e.status === 'ACTIVE').length,
      completedEnrollments: course.enrollments.filter(e => e.status === 'COMPLETED').length,
      averageProgress: course.enrollments.length > 0 
        ? Math.round(course.enrollments.reduce((sum, e) => sum + e.progress, 0) / course.enrollments.length)
        : 0,
      totalRevenue: course.payments
        .filter(p => p.status === 'COMPLETED')
        .reduce((sum, p) => sum + p.amount, 0),
      completionRate: course.enrollments.length > 0
        ? Math.round((course.enrollments.filter(e => e.status === 'COMPLETED').length / course.enrollments.length) * 100)
        : 0,
    }

    return stats
  }
}
