# Admin and Student Management System Setup

This document provides instructions for setting up the admin and student management system with the following features:

## Features Implemented

1. **3 Predefined Admin Accounts** (no signup option)
   - Super Admin: `superadmin@konnectingdots.com` / `SuperAdmin@2024`
   - Admin: `admin@konnectingdots.com` / `Admin@2024`
   - Manager: `manager@konnectingdots.com` / `Manager@2024`

2. **Student Approval Workflow**
   - Students register but accounts are not active until approved
   - Only Super Admin can approve student accounts
   - Email notifications sent to super admin for new registrations
   - Email notifications sent to students upon approval/rejection

3. **Role-Based Access Control**
   - Super Admin: Can approve/reject students, full admin access
   - Admin: Can manage students and courses, cannot approve students
   - Manager: Limited admin access
   - Students: Access to student dashboard only after approval

4. **Dashboards**
   - Admin Dashboard: Manage students, courses, view analytics
   - Student Dashboard: View courses, progress, certificates

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/konnecting_dots"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="noreply@konnectingdots.com"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Database Setup

1. Run database migrations:
```bash
npm run db:push
```

2. Create admin accounts:
```bash
npm run create-admin-accounts
```

### 3. Email Configuration

For Gmail SMTP:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Use the App Password in `SMTP_PASS`

### 4. Start the Application

```bash
npm run dev
```

## Usage

### Admin Access

1. Go to `/admin-login`
2. Use one of the predefined admin accounts
3. Access the admin dashboard to manage students

### Student Registration

1. Students register at `/signup`
2. Account is created but not active
3. Super Admin receives email notification
4. Super Admin approves/rejects in admin dashboard
5. Student receives email with approval status

### Student Dashboard

1. After approval, students can login at `/login`
2. They are automatically redirected to `/student-dashboard`
3. Access courses, view progress, download certificates

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login (supports both admin and student)
- `POST /api/auth/register` - Student registration (creates pending account)

### Admin
- `GET /api/admin/students/approve` - Get pending student approvals
- `POST /api/admin/students/approve` - Approve/reject student
- `GET /api/admin/dashboard` - Admin dashboard data

### Student
- `GET /api/students/dashboard` - Student dashboard data

## Database Schema

### Key Tables
- `users` - User accounts with role-based access
- `student_approvals` - Student approval requests
- `enrollments` - Student course enrollments
- `progress` - Student progress tracking

### User Roles
- `super_admin` - Full access, can approve students
- `admin` - Manage students and courses
- `manager` - Limited admin access
- `student` - Student dashboard access only

## Security Features

1. **JWT Authentication** - Secure token-based authentication
2. **Role-Based Access** - Different permissions for different roles
3. **Password Hashing** - Bcrypt for secure password storage
4. **Email Verification** - Email notifications for important actions
5. **Approval Workflow** - Students must be approved before access

## Troubleshooting

### Common Issues

1. **Database Connection**: Ensure DATABASE_URL is correct
2. **Email Not Sending**: Check SMTP credentials and settings
3. **Admin Login Fails**: Run `npm run create-admin-accounts` to create accounts
4. **Student Not Approved**: Check if super admin account exists and is active

### Logs

Check console logs for detailed error messages and debugging information.

## Next Steps

1. Configure production email service (SendGrid, AWS SES, etc.)
2. Set up proper JWT secret in production
3. Configure database for production
4. Add more detailed logging and monitoring
5. Implement additional admin features as needed
