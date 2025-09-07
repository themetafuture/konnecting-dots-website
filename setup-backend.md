# Backend Setup Guide

This guide will help you set up the complete backend for your Konnecting Dots website.

## Prerequisites

- Node.js 18+ installed
- Git installed
- Code editor (VS Code recommended)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Environment Configuration

1. Copy the environment template:
```bash
cp env.example .env
```

2. Edit `.env` file and update the following values:
   - `JWT_SECRET`: Generate a strong random secret (32+ characters)
   - `NEXTAUTH_SECRET`: Generate another strong random secret
   - `DATABASE_URL`: Keep as `file:./dev.db` for development
   - Update email settings if you want email functionality

## Step 3: Database Setup

1. Generate Prisma client:
```bash
npm run db:generate
```

2. Push database schema:
```bash
npm run db:push
```

3. Seed the database with sample data:
```bash
npm run db:seed
```

## Step 4: Verify Setup

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and visit:
   - Frontend: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin
   - API Health: http://localhost:3000/api/auth/profile

## Step 5: Test Authentication

Use the following test accounts:

### Admin Account
- Email: `admin@konnectingdots.com`
- Password: `admin123`

### Instructor Account
- Email: `instructor@konnectingdots.com`
- Password: `instructor123`

### Student Account
- Email: `student@example.com`
- Password: `student123`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Courses
- `GET /api/courses` - List all courses
- `POST /api/courses` - Create course (admin/instructor)
- `GET /api/courses/[id]` - Get course by ID
- `PUT /api/courses/[id]` - Update course (admin/instructor)
- `DELETE /api/courses/[id]` - Delete course (admin/instructor)
- `GET /api/courses/slug/[slug]` - Get course by slug

### Students
- `GET /api/students` - List all students (admin)
- `GET /api/students/[id]` - Get student by ID (admin)
- `PUT /api/students/[id]` - Update student (admin)
- `DELETE /api/students/[id]` - Delete student (admin)
- `GET /api/students/stats` - Get student statistics (admin)

### Events
- `GET /api/events` - List all events
- `POST /api/events` - Create event (admin/instructor)
- `GET /api/events/upcoming` - Get upcoming events

### Blog
- `GET /api/blog` - List blog posts
- `POST /api/blog` - Create blog post (admin/instructor)
- `GET /api/blog/featured` - Get featured posts
- `GET /api/blog/recent` - Get recent posts

### Admin Dashboard
- `GET /api/admin/dashboard` - Get dashboard data (admin)

## Database Management

### View Database
```bash
npm run db:studio
```

### Reset Database
```bash
npx prisma db push --force-reset
npm run db:seed
```

### Create Migration
```bash
npm run db:migrate
```

## File Structure

```
backend/
├── config/          # Configuration files
├── controllers/     # API route handlers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── services/        # Business logic
├── utils/           # Utility functions
├── data/            # Data directories
└── prisma/          # Database schema

app/api/             # Next.js API routes
├── auth/            # Authentication endpoints
├── courses/         # Course management
├── students/        # Student management
├── events/          # Event management
├── blog/            # Blog management
└── admin/           # Admin dashboard
```

## Features Included

✅ **Authentication System**
- JWT-based authentication
- Role-based access control (Admin, Instructor, Student)
- Password hashing with bcrypt
- Secure cookie management

✅ **Course Management**
- Create, read, update, delete courses
- Course categories and levels
- Pricing and duration tracking
- Enrollment management

✅ **Student Management**
- Student profiles and progress tracking
- Enrollment history
- Payment tracking
- Performance analytics

✅ **Event Management**
- Training events and workshops
- Scheduling and location management
- Attendee tracking
- Event statistics

✅ **Blog System**
- Content management for articles
- Categories and tags
- Featured posts
- View tracking

✅ **Admin Dashboard**
- Comprehensive analytics
- Student management
- Course oversight
- Revenue tracking

✅ **Data Organization**
- Structured file directories
- Secure file uploads
- Organized content management

## Next Steps

1. **Customize Content**: Update course descriptions, blog posts, and testimonials
2. **Add Real Data**: Replace sample data with your actual content
3. **Configure Email**: Set up email service for notifications
4. **Payment Integration**: Add Stripe or PayPal integration
5. **File Uploads**: Implement file upload functionality
6. **Security**: Review and enhance security measures
7. **Testing**: Add comprehensive test coverage

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure SQLite is installed
   - Check DATABASE_URL in .env file

2. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check token expiration settings

3. **Permission Denied**
   - Ensure user has correct role
   - Check authentication middleware

4. **File Upload Issues**
   - Verify upload directory permissions
   - Check file size limits

### Getting Help

- Check the console for error messages
- Review the API response for detailed error information
- Ensure all environment variables are properly set
- Verify database schema is up to date

## Security Notes

- Never commit `.env` file to version control
- Use strong, unique secrets for JWT and NextAuth
- Regularly update dependencies
- Implement rate limiting for production
- Use HTTPS in production
- Regular security audits recommended
