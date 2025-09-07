import { prisma } from '../config/database'
import { createError } from '../middleware/error'
import { createEventSchema, updateEventSchema, eventQuerySchema } from '../utils/validation'

export class EventService {
  async createEvent(data: any) {
    const validatedData = createEventSchema.parse(data)

    const event = await prisma.event.create({
      data: validatedData,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            category: true,
          }
        },
        _count: {
          select: {
            sessions: true,
            payments: true,
          }
        }
      }
    })

    return event
  }

  async getEvents(query: any) {
    const { page, limit, search, type, status, startDate, endDate, sortBy, sortOrder } = 
      eventQuerySchema.parse(query)

    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (type) where.type = type
    if (status) where.status = status
    if (startDate) where.startDate = { gte: new Date(startDate) }
    if (endDate) where.endDate = { lte: new Date(endDate) }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy || 'startDate']: sortOrder },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              category: true,
            }
          },
          _count: {
            select: {
              sessions: true,
              payments: true,
            }
          }
        }
      }),
      prisma.event.count({ where })
    ])

    return {
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  async getEventById(id: string) {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            category: true,
            level: true,
          }
        },
        sessions: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              }
            }
          },
          orderBy: {
            scheduledAt: 'asc'
          }
        },
        payments: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            sessions: true,
            payments: true,
          }
        }
      }
    })

    if (!event) {
      throw createError('Event not found', 404)
    }

    return event
  }

  async updateEvent(id: string, data: any) {
    const validatedData = updateEventSchema.parse(data)

    const event = await prisma.event.findUnique({
      where: { id }
    })

    if (!event) {
      throw createError('Event not found', 404)
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: validatedData,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            category: true,
          }
        },
        _count: {
          select: {
            sessions: true,
            payments: true,
          }
        }
      }
    })

    return updatedEvent
  }

  async deleteEvent(id: string) {
    const event = await prisma.event.findUnique({
      where: { id }
    })

    if (!event) {
      throw createError('Event not found', 404)
    }

    // Check if event has sessions or payments
    const [sessionCount, paymentCount] = await Promise.all([
      prisma.session.count({ where: { eventId: id } }),
      prisma.payment.count({ where: { eventId: id } })
    ])

    if (sessionCount > 0 || paymentCount > 0) {
      throw createError('Cannot delete event with associated sessions or payments', 400)
    }

    await prisma.event.delete({
      where: { id }
    })

    return { message: 'Event deleted successfully' }
  }

  async getUpcomingEvents(limit: number = 10) {
    const events = await prisma.event.findMany({
      where: {
        status: 'SCHEDULED',
        startDate: {
          gte: new Date()
        }
      },
      take: limit,
      orderBy: {
        startDate: 'asc'
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            category: true,
            image: true,
          }
        },
        _count: {
          select: {
            sessions: true,
            payments: true,
          }
        }
      }
    })

    return events
  }

  async getEventStats(id: string) {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        sessions: {
          select: {
            status: true,
            scheduledAt: true,
            duration: true,
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

    if (!event) {
      throw createError('Event not found', 404)
    }

    const stats = {
      totalSessions: event.sessions.length,
      completedSessions: event.sessions.filter(s => s.status === 'COMPLETED').length,
      totalDuration: event.sessions
        .filter(s => s.status === 'COMPLETED')
        .reduce((sum, s) => sum + s.duration, 0),
      totalRevenue: event.payments
        .filter(p => p.status === 'COMPLETED')
        .reduce((sum, p) => sum + p.amount, 0),
      attendanceRate: event.sessions.length > 0
        ? Math.round((event.sessions.filter(s => s.status === 'COMPLETED').length / event.sessions.length) * 100)
        : 0,
    }

    return stats
  }

  async getEventCalendar(startDate: Date, endDate: Date) {
    const events = await prisma.event.findMany({
      where: {
        startDate: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: {
        startDate: 'asc'
      },
      include: {
        course: {
          select: {
            title: true,
            category: true,
          }
        },
        _count: {
          select: {
            sessions: true,
            payments: true,
          }
        }
      }
    })

    return events
  }
}
