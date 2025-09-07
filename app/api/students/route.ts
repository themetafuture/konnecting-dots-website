import { NextRequest, NextResponse } from 'next/server'
import { StudentService } from '@/backend/services/studentService'

const studentService = new StudentService()

export async function GET(request: NextRequest) {
  try {
    // For now, allow access without authentication for development
    // TODO: Add proper authentication in production
    
    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())
    
    try {
      const result = await studentService.getStudents(query)
      
      return NextResponse.json({
        success: true,
        data: result
      })
    } catch (dbError) {
      console.log('Database not ready, using mock data:', dbError.message)
      
      // Return mock data for development
      const mockStudents = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          stats: {
            totalCourses: 2,
            completedCourses: 1,
            activeCourses: 1,
            averageProgress: 75,
            totalSpent: 2500
          },
          enrollments: [
            {
              course: {
                title: 'NLP Practitioner Certification',
                category: 'NLP'
              },
              status: 'ACTIVE',
              progress: 75
            }
          ],
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-20T14:30:00Z'
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phone: '+1 (555) 987-6543',
          stats: {
            totalCourses: 1,
            completedCourses: 1,
            activeCourses: 0,
            averageProgress: 100,
            totalSpent: 1800
          },
          enrollments: [
            {
              course: {
                title: 'Hypnosis Mastery',
                category: 'HYPNOSIS'
              },
              status: 'COMPLETED',
              progress: 100
            }
          ],
          createdAt: '2024-01-10T09:00:00Z',
          updatedAt: '2024-01-18T16:45:00Z'
        }
      ]

      return NextResponse.json({
        success: true,
        data: {
          students: mockStudents,
          pagination: {
            page: 1,
            limit: 10,
            total: 2,
            pages: 1
          }
        }
      })
    }
  } catch (error: any) {
    console.error('Students fetch error:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch students'
    }, { status: error.status || 500 })
  }
}
