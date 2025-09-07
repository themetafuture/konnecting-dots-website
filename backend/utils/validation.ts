import { z } from 'zod'

// User validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const updateUserSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
})

// Course validation schemas
export const createCourseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  content: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  duration: z.number().min(1, 'Duration must be at least 1 hour'),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  category: z.enum(['NLP', 'HYPNOSIS', 'CORPORATE_TRAINING', 'DEI_TRAINING', 'TRAIN_THE_TRAINER', 'PRACTITIONER', 'PERSONAL_DEVELOPMENT']),
  image: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  materials: z.array(z.string().url()).optional(),
  prerequisites: z.string().optional(),
  learningOutcomes: z.string().optional(),
})

export const updateCourseSchema = createCourseSchema.partial()

// Event validation schemas
export const createEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  courseId: z.string().optional(),
  type: z.enum(['WORKSHOP', 'SEMINAR', 'CONFERENCE', 'RETREAT', 'ONLINE_SESSION', 'ONE_ON_ONE']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  location: z.string().optional(),
  maxAttendees: z.number().min(1).optional(),
  price: z.number().min(0).optional(),
  image: z.string().url().optional(),
})

export const updateEventSchema = createEventSchema.partial()

// Blog validation schemas
export const createBlogPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  excerpt: z.string().optional(),
  category: z.enum(['NLP_TECHNIQUES', 'HYPNOSIS', 'CORPORATE_TRAINING', 'PERSONAL_DEVELOPMENT', 'CASE_STUDIES', 'WELLNESS', 'LEADERSHIP']),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  image: z.string().url().optional(),
  readTime: z.number().min(1).optional(),
})

export const updateBlogPostSchema = createBlogPostSchema.partial()

// Testimonial validation schemas
export const createTestimonialSchema = z.object({
  content: z.string().min(10, 'Content must be at least 10 characters'),
  author: z.string().min(2, 'Author name must be at least 2 characters'),
  position: z.string().optional(),
  company: z.string().optional(),
  rating: z.number().min(1).max(5).default(5),
  image: z.string().url().optional(),
})

export const updateTestimonialSchema = createTestimonialSchema.partial()

// Contact validation schemas
export const createContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

// Session validation schemas
export const createSessionSchema = z.object({
  enrollmentId: z.string().optional(),
  eventId: z.string().optional(),
  type: z.enum(['CONSULTATION', 'COACHING', 'TRAINING', 'FOLLOW_UP']),
  scheduledAt: z.string().datetime(),
  duration: z.number().min(15, 'Duration must be at least 15 minutes'),
  notes: z.string().optional(),
})

export const updateSessionSchema = createSessionSchema.partial()

// Payment validation schemas
export const createPaymentSchema = z.object({
  courseId: z.string().optional(),
  eventId: z.string().optional(),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  currency: z.string().default('USD'),
  method: z.enum(['CREDIT_CARD', 'BANK_TRANSFER', 'PAYPAL', 'STRIPE', 'CASH']),
  description: z.string().optional(),
})

// Query validation schemas
export const paginationSchema = z.object({
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('10'),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const courseQuerySchema = paginationSchema.extend({
  category: z.string().optional(),
  level: z.string().optional(),
  status: z.string().optional(),
  isPublished: z.string().transform(val => val === 'true').optional(),
})

export const blogQuerySchema = paginationSchema.extend({
  category: z.string().optional(),
  status: z.string().optional(),
  featured: z.string().transform(val => val === 'true').optional(),
})

export const eventQuerySchema = paginationSchema.extend({
  type: z.string().optional(),
  status: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})
