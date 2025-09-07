import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@konnectingdots.com' },
    update: {},
    create: {
      email: 'admin@konnectingdots.com',
      password: adminPassword,
      firstName: 'Yousif',
      lastName: 'Mangi',
      role: 'ADMIN',
      phone: '+1 (555) 123-4567',
      isActive: true,
    },
  })

  // Create instructor user
  const instructorPassword = await bcrypt.hash('instructor123', 12)
  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@konnectingdots.com' },
    update: {},
    create: {
      email: 'instructor@konnectingdots.com',
      password: instructorPassword,
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'INSTRUCTOR',
      phone: '+1 (555) 987-6543',
      isActive: true,
    },
  })

  // Create sample courses
  const nlpCourse = await prisma.course.upsert({
    where: { slug: 'nlp-practitioner-certification' },
    update: {},
    create: {
      title: 'NLP Practitioner Certification',
      slug: 'nlp-practitioner-certification',
      description: 'Comprehensive NLP Practitioner certification program covering core techniques and applications.',
      content: 'This intensive program covers all essential NLP techniques including anchoring, reframing, and rapport building.',
      price: 2497.00,
      duration: 40,
      level: 'INTERMEDIATE',
      category: 'NLP',
      status: 'PUBLISHED',
      isPublished: true,
      image: '/images/nlp-course.jpg',
      prerequisites: 'Basic understanding of psychology or coaching',
      learningOutcomes: 'Master core NLP techniques, build rapport with clients, and apply NLP in professional settings.',
    },
  })

  const hypnosisCourse = await prisma.course.upsert({
    where: { slug: 'clinical-hypnosis-training' },
    update: {},
    create: {
      title: 'Clinical Hypnosis Training',
      slug: 'clinical-hypnosis-training',
      description: 'Professional hypnosis training for therapeutic applications and personal development.',
      content: 'Learn safe and effective hypnosis techniques for therapeutic use and personal transformation.',
      price: 1997.00,
      duration: 32,
      level: 'ADVANCED',
      category: 'HYPNOSIS',
      status: 'PUBLISHED',
      isPublished: true,
      image: '/images/hypnosis-course.jpg',
      prerequisites: 'NLP Practitioner certification recommended',
      learningOutcomes: 'Master hypnosis induction techniques, understand therapeutic applications, and practice safely.',
    },
  })

  const corporateCourse = await prisma.course.upsert({
    where: { slug: 'corporate-leadership-training' },
    update: {},
    create: {
      title: 'Corporate Leadership Training',
      slug: 'corporate-leadership-training',
      description: 'Transform your leadership team with cutting-edge NLP techniques and communication strategies.',
      content: 'Advanced leadership development program using NLP principles for organizational success.',
      price: 4997.00,
      duration: 24,
      level: 'EXPERT',
      category: 'CORPORATE_TRAINING',
      status: 'PUBLISHED',
      isPublished: true,
      image: '/images/corporate-course.jpg',
      prerequisites: 'Management experience recommended',
      learningOutcomes: 'Enhance team communication, improve decision-making, and drive organizational change.',
    },
  })

  // Create sample events
  const workshopEvent = await prisma.event.upsert({
    where: { id: 'workshop-1' },
    update: {},
    create: {
      id: 'workshop-1',
      title: 'NLP Anchoring Workshop',
      description: 'Hands-on workshop covering advanced anchoring techniques for rapid behavior change.',
      courseId: nlpCourse.id,
      type: 'WORKSHOP',
      status: 'SCHEDULED',
      startDate: new Date('2024-02-15T09:00:00Z'),
      endDate: new Date('2024-02-15T17:00:00Z'),
      location: 'Downtown Conference Center',
      maxAttendees: 25,
      price: 297.00,
      image: '/images/workshop-anchoring.jpg',
    },
  })

  // Create sample blog posts
  const blogPost1 = await prisma.blogPost.upsert({
    where: { slug: 'science-behind-rapid-transformation' },
    update: {},
    create: {
      title: 'The Science Behind Rapid Personal Transformation',
      slug: 'science-behind-rapid-transformation',
      content: 'Discover how cutting-edge neuroscience research validates ancient NLP techniques and why some people achieve breakthrough results in days while others struggle for years...',
      excerpt: 'Learn the neuroscience behind why NLP techniques work so effectively for rapid personal change.',
      authorId: admin.id,
      category: 'NLP_TECHNIQUES',
      tags: JSON.stringify(['NLP', 'neuroscience', 'transformation', 'personal-development']),
      status: 'PUBLISHED',
      featured: true,
      image: '/images/blog/neuroscience-nlp.jpg',
      readTime: 8,
      views: 1250,
      publishedAt: new Date('2024-03-15T10:00:00Z'),
    },
  })

  const blogPost2 = await prisma.blogPost.upsert({
    where: { slug: 'debunking-hypnosis-myths' },
    update: {},
    create: {
      title: 'Debunking Common Hypnosis Myths',
      slug: 'debunking-hypnosis-myths',
      content: 'Separate fact from fiction and understand what hypnosis really is and how it can benefit your life...',
      excerpt: 'Learn the truth about hypnosis and how it can help you overcome limiting beliefs.',
      authorId: instructor.id,
      category: 'HYPNOSIS',
      tags: JSON.stringify(['hypnosis', 'myths', 'therapy', 'mindset']),
      status: 'PUBLISHED',
      featured: false,
      image: '/images/blog/hypnosis-myths.jpg',
      readTime: 5,
      views: 890,
      publishedAt: new Date('2024-03-10T14:00:00Z'),
    },
  })

  // Create sample testimonials
  await prisma.testimonial.upsert({
    where: { id: 'testimonial-1' },
    update: {},
    create: {
      id: 'testimonial-1',
      content: 'The NLP training transformed our leadership team\'s communication and boosted our productivity by 40%. The results were immediate and lasting.',
      author: 'John Davidson',
      position: 'CEO',
      company: 'TechCorp Solutions',
      rating: 5,
      image: '/images/testimonials/john-davidson.jpg',
      isActive: true,
    },
  })

  await prisma.testimonial.upsert({
    where: { id: 'testimonial-2' },
    update: {},
    create: {
      id: 'testimonial-2',
      content: 'The hypnosis sessions helped me overcome anxiety that had held me back for years. I now feel confident and in control of my life.',
      author: 'Sarah Mitchell',
      position: 'Marketing Director',
      company: 'Creative Agency',
      rating: 5,
      image: '/images/testimonials/sarah-mitchell.jpg',
      isActive: true,
    },
  })

  await prisma.testimonial.upsert({
    where: { id: 'testimonial-3' },
    update: {},
    create: {
      id: 'testimonial-3',
      content: 'The DEI training created a more inclusive culture and improved employee satisfaction by 60%. Our team is stronger than ever.',
      author: 'Robert Johnson',
      position: 'HR Manager',
      company: 'Global Enterprises',
      rating: 5,
      image: '/images/testimonials/robert-johnson.jpg',
      isActive: true,
    },
  })

  // Create sample student
  const studentPassword = await bcrypt.hash('student123', 12)
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      password: studentPassword,
      firstName: 'Alex',
      lastName: 'Thompson',
      role: 'STUDENT',
      phone: '+1 (555) 456-7890',
      isActive: true,
    },
  })

  // Create enrollment
  await prisma.enrollment.upsert({
    where: { 
      userId_courseId: {
        userId: student.id,
        courseId: nlpCourse.id
      }
    },
    update: {},
    create: {
      userId: student.id,
      courseId: nlpCourse.id,
      status: 'ACTIVE',
      progress: 25,
      startedAt: new Date('2024-01-15T10:00:00Z'),
    },
  })

  // Create sample payment
  await prisma.payment.upsert({
    where: { id: 'payment-1' },
    update: {},
    create: {
      id: 'payment-1',
      userId: student.id,
      courseId: nlpCourse.id,
      amount: 2497.00,
      currency: 'USD',
      status: 'COMPLETED',
      method: 'CREDIT_CARD',
      description: 'NLP Practitioner Certification',
    },
  })

  console.log('✅ Database seeding completed!')
  console.log('👤 Admin user: admin@konnectingdots.com / admin123')
  console.log('👨‍🏫 Instructor user: instructor@konnectingdots.com / instructor123')
  console.log('👨‍🎓 Student user: student@example.com / student123')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
