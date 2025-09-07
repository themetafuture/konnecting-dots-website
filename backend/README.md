# Konnecting Dots Backend

This is the backend API for the Konnecting Dots website, providing comprehensive data management for NLP, Hypnosis, and Corporate Training services.

## Directory Structure

```
backend/
├── config/           # Configuration files
├── controllers/      # API route handlers
├── middleware/       # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── services/        # Business logic
├── utils/           # Utility functions
├── data/            # Data directories
│   ├── courses/     # Course content and materials
│   ├── students/    # Student data and progress
│   ├── events/      # Training events and schedules
│   ├── blog/        # Blog posts and articles
│   ├── testimonials/# Client testimonials
│   └── uploads/     # File uploads
└── prisma/          # Database schema and migrations
```

## Features

- **Authentication & Authorization**: JWT-based auth with role management
- **Student Management**: Complete student lifecycle management
- **Course Management**: Dynamic course creation and management
- **Event Management**: Training events and scheduling
- **Blog System**: Content management for articles
- **Payment Processing**: Integration with payment gateways
- **File Management**: Secure file uploads and storage
- **Email Services**: Automated email notifications
- **Analytics**: Comprehensive reporting and analytics
- **Admin Dashboard**: Full administrative interface

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables
3. Initialize database: `npx prisma migrate dev`
4. Start development server: `npm run dev`

## API Documentation

The API follows RESTful conventions and provides endpoints for:
- Authentication (`/api/auth`)
- Students (`/api/students`)
- Courses (`/api/courses`)
- Events (`/api/events`)
- Blog (`/api/blog`)
- Admin (`/api/admin`)
- Uploads (`/api/upload`)
