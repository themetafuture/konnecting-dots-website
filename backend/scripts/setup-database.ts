import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function setupDatabase() {
  try {
    console.log('🚀 Setting up database and creating accounts...')

    // Create admin accounts
    console.log('📝 Creating admin accounts...')
    
    const superAdminPassword = await bcrypt.hash('SuperAdmin@2024', 12)
    const superAdmin = await prisma.user.upsert({
      where: { email: 'superadmin@konnectingdots.com' },
      update: {},
      create: {
        email: 'superadmin@konnectingdots.com',
        password: superAdminPassword,
        firstName: 'Super',
        lastName: 'Admin',
        role: 'super_admin',
        isActive: true,
        emailVerified: true,
        isApproved: true,
        approvedAt: new Date(),
      },
    })
    console.log('✅ Super Admin created:', superAdmin.email)

    const adminPassword = await bcrypt.hash('Admin@2024', 12)
    const admin = await prisma.user.upsert({
      where: { email: 'admin@konnectingdots.com' },
      update: {},
      create: {
        email: 'admin@konnectingdots.com',
        password: adminPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isActive: true,
        emailVerified: true,
        isApproved: true,
        approvedAt: new Date(),
      },
    })
    console.log('✅ Admin created:', admin.email)

    const managerPassword = await bcrypt.hash('Manager@2024', 12)
    const manager = await prisma.user.upsert({
      where: { email: 'manager@konnectingdots.com' },
      update: {},
      create: {
        email: 'manager@konnectingdots.com',
        password: managerPassword,
        firstName: 'Manager',
        lastName: 'User',
        role: 'manager',
        isActive: true,
        emailVerified: true,
        isApproved: true,
        approvedAt: new Date(),
      },
    })
    console.log('✅ Manager created:', manager.email)

    // Create test student
    console.log('👨‍🎓 Creating test student...')
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
    console.log('✅ Test Student created:', testStudent.email)

    // Create sample course
    console.log('📚 Creating sample course...')
    const sampleCourse = await prisma.course.upsert({
      where: { id: 'test-course-1' },
      update: {},
      create: {
        id: 'test-course-1',
        title: 'NLP Practitioner Certification',
        description: 'Complete NLP Practitioner certification course',
        content: 'This is a comprehensive NLP Practitioner certification course that covers all the essential techniques and principles.',
        durationHours: 40,
        price: 2500,
        status: 'published',
      },
    })
    console.log('✅ Sample course created:', sampleCourse.title)

    // Enroll test student in the course
    console.log('📖 Enrolling student in course...')
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
    console.log('✅ Enrollment created:', enrollment.id)

    // Create course modules
    console.log('📋 Creating course modules...')
    const courseModules = await prisma.courseModule.createMany({
      data: [
        {
          courseId: sampleCourse.id,
          title: 'Module 1: NLP Foundations',
          description: 'Introduction to NLP principles',
          content: 'Learn the basic principles of NLP and how they apply to personal development.',
          orderIndex: 1,
        },
        {
          courseId: sampleCourse.id,
          title: 'Module 2: Communication Mastery',
          description: 'Advanced communication techniques',
          content: 'Master advanced communication skills for better relationships and influence.',
          orderIndex: 2,
        },
        {
          courseId: sampleCourse.id,
          title: 'Module 3: Anchoring Techniques',
          description: 'Learn anchoring methods',
          content: 'Discover powerful anchoring techniques for emotional state management.',
          orderIndex: 3,
        },
        {
          courseId: sampleCourse.id,
          title: 'Module 4: Timeline Therapy',
          description: 'Heal past traumas and create future success',
          content: 'Learn timeline therapy techniques to overcome limiting beliefs.',
          orderIndex: 4,
        },
      ],
    })
    console.log('✅ Course modules created:', courseModules.count)

    // Get the modules to create progress
    const modules = await prisma.courseModule.findMany({
      where: { courseId: sampleCourse.id },
      orderBy: { orderIndex: 'asc' },
    })

    // Create progress for modules
    console.log('📊 Creating student progress...')
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i]
      let status = 'not_started'
      let progressPercentage = 0
      let startedAt = null
      let completedAt = null

      if (i < 2) {
        // First two modules completed
        status = 'completed'
        progressPercentage = 100
        startedAt = new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000)
        completedAt = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      } else if (i === 2) {
        // Third module in progress
        status = 'in_progress'
        progressPercentage = 65
        startedAt = new Date(Date.now() - 2 * 60 * 60 * 1000)
      }

      await prisma.progress.create({
        data: {
          enrollmentId: enrollment.id,
          moduleId: module.id,
          status,
          startedAt,
          completedAt,
          progressPercentage,
        },
      })
    }
    console.log('✅ Student progress created')

    console.log('\n🎉 Database setup completed successfully!')
    console.log('\n📋 Account Credentials:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🔐 ADMIN ACCOUNTS:')
    console.log('   Super Admin: superadmin@konnectingdots.com / SuperAdmin@2024')
    console.log('   Admin:       admin@konnectingdots.com / Admin@2024')
    console.log('   Manager:     manager@konnectingdots.com / Manager@2024')
    console.log('')
    console.log('👨‍🎓 STUDENT ACCOUNTS:')
    console.log('   Test Student: teststudent@example.com / TestStudent@2024')
    console.log('   (Pre-approved with course enrollment and progress)')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('\n🚀 Ready to test!')
    console.log('   • Admin Login: /admin-login')
    console.log('   • Student Login: /login')
    console.log('   • Student Registration: /signup')

  } catch (error) {
    console.error('❌ Error setting up database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setupDatabase()
