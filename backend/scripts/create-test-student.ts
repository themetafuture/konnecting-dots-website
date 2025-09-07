import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createTestStudent() {
  try {
    console.log('Creating test student account...')

    // Create test student
    const testStudentPassword = await bcrypt.hash('TestStudent@2024', 12)
    const testStudent = await prisma.user.upsert({
      where: { email: 'teststudent@example.com' },
      update: {},
      create: {
        email: 'teststudent@example.com',
        password: testStudentPassword,
        firstName: 'Test',
        lastName: 'Student',
        phone: '+1 (555) 123-4567',
        role: 'student',
        isActive: true,
        emailVerified: true,
        isApproved: true,
        approvedAt: new Date(),
      },
    })
    console.log('Test Student created:', testStudent.email)

    // Create a sample course for testing
    const sampleCourse = await prisma.course.upsert({
      where: { id: 'test-course-1' },
      update: {},
      create: {
        id: 'test-course-1',
        title: 'NLP Practitioner Certification',
        description: 'Complete NLP Practitioner certification course',
        content: 'This is a comprehensive NLP Practitioner certification course...',
        durationHours: 40,
        price: 2500,
        status: 'published',
      },
    })
    console.log('Sample course created:', sampleCourse.title)

    // Enroll test student in the course
    const enrollment = await prisma.enrollment.upsert({
      where: {
        studentId_courseId: {
          studentId: testStudent.id,
          courseId: sampleCourse.id,
        },
      },
      update: {},
      create: {
        studentId: testStudent.id,
        courseId: sampleCourse.id,
        status: 'active',
        enrolledAt: new Date(),
      },
    })
    console.log('Enrollment created:', enrollment.id)

    // Create some progress for the student
    const courseModules = await prisma.courseModule.createMany({
      data: [
        {
          courseId: sampleCourse.id,
          title: 'Module 1: NLP Foundations',
          description: 'Introduction to NLP principles',
          content: 'Learn the basic principles of NLP...',
          orderIndex: 1,
        },
        {
          courseId: sampleCourse.id,
          title: 'Module 2: Communication Mastery',
          description: 'Advanced communication techniques',
          content: 'Master advanced communication skills...',
          orderIndex: 2,
        },
        {
          courseId: sampleCourse.id,
          title: 'Module 3: Anchoring Techniques',
          description: 'Learn anchoring methods',
          content: 'Discover powerful anchoring techniques...',
          orderIndex: 3,
        },
      ],
    })
    console.log('Course modules created:', courseModules.count)

    // Get the modules to create progress
    const modules = await prisma.courseModule.findMany({
      where: { courseId: sampleCourse.id },
    })

    // Create progress for first two modules
    for (let i = 0; i < Math.min(2, modules.length); i++) {
      await prisma.progress.create({
        data: {
          enrollmentId: enrollment.id,
          moduleId: modules[i].id,
          status: 'completed',
          startedAt: new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000), // Started i+1 days ago
          completedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000), // Completed i days ago
          progressPercentage: 100,
        },
      })
    }

    // Create progress for third module (in progress)
    if (modules.length > 2) {
      await prisma.progress.create({
        data: {
          enrollmentId: enrollment.id,
          moduleId: modules[2].id,
          status: 'in_progress',
          startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // Started 2 hours ago
          progressPercentage: 65,
        },
      })
    }

    console.log('Test student account created successfully!')
    console.log('\nTest Student Credentials:')
    console.log('Email: teststudent@example.com')
    console.log('Password: TestStudent@2024')
    console.log('\nThis student is already approved and can login immediately.')
    console.log('The student has been enrolled in a sample course with progress.')

  } catch (error) {
    console.error('Error creating test student:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestStudent()
