# Supabase Setup Guide for Konnecting Dots Website

## Overview
This guide will help you set up Supabase for your Konnecting Dots website. Supabase provides authentication, database, and real-time features.

## Prerequisites
- Node.js installed
- npm or pnpm package manager
- Supabase account

## Step 1: Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://ofuyryykwhufjlimoamd.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdXlyeXlrd2h1ZmpsaW1vYW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNjI1ODUsImV4cCI6MjA3MjczODU4NX0.HBi8t1Gfkgw5c6kxeAeqr3xk2vyFcHvFNo4S6c17Ey8"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdXlyeXlrd2h1ZmpsaW1vYW1kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzE2MjU4NSwiZXhwIjoyMDcyNzM4NTg1fQ.7i-OyYV8ZcrP0imUicbi3bVRPvahx_ajegYsJ2KPpH0"

# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:KenanWilliams2025@db.ofuyryykwhufjlimoamd.supabase.co:5432/postgres"

# JWT Configuration (Optional - Supabase handles auth)
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-random"
JWT_EXPIRES_IN="7d"

# NextAuth Configuration (Optional - if using NextAuth alongside Supabase)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"

# Email Configuration (Optional)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# File Upload Configuration
UPLOAD_DIR="./backend/data/uploads"
MAX_FILE_SIZE="10485760"
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/gif,application/pdf"

# Environment
NODE_ENV="development"
```

## Step 2: Install Dependencies

The required Supabase dependencies are already installed:

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs @supabase/auth-ui-react @supabase/auth-ui-shared
```

## Step 3: Database Setup

Your Supabase database already has the following tables created:

- `users` - User accounts and profiles
- `profiles` - Additional user profile information
- `courses` - Course information
- `course_modules` - Course modules/lessons
- `enrollments` - Student course enrollments
- `progress` - Student progress tracking
- `events` - Workshops, seminars, conferences
- `blog_posts` - Blog articles
- `contact_messages` - Contact form submissions
- `payments` - Payment records
- `testimonials` - Student testimonials
- `admin_actions` - Admin activity logs

## Step 4: Generate Prisma Client

Run the following commands to generate the Prisma client and push the schema:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (if needed)
npm run db:push
```

## Step 5: Test the Connection

1. Start your development server:
```bash
npm run dev
```

2. Test authentication by visiting:
   - `/login` - Login page
   - `/signup` - Registration page
   - `/admin` - Admin dashboard (requires admin role)

## Step 6: Authentication Features

### Available Auth Functions

**Client-side (in React components):**
```typescript
import { auth } from '@/lib/auth'

// Sign up
const { data, error } = await auth.signUp(email, password, fullName)

// Sign in
const { data, error } = await auth.signIn(email, password)

// Sign out
const { error } = await auth.signOut()

// Get current user
const { user, error } = await auth.getCurrentUser()

// Listen to auth changes
auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session)
})
```

**Server-side (in API routes):**
```typescript
import { serverAuth } from '@/lib/auth'

// Check if user is authenticated
const isAuthenticated = await serverAuth.isAuthenticated()

// Check user role
const isAdmin = await serverAuth.hasRole('admin')

// Get current user
const { user, error } = await serverAuth.getUser()
```

## Step 7: Database Operations

### Using Supabase Client
```typescript
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

// Fetch data
const { data, error } = await supabase
  .from('courses')
  .select('*')
  .eq('status', 'published')

// Insert data
const { data, error } = await supabase
  .from('users')
  .insert({ email, first_name, last_name, role: 'student' })

// Update data
const { data, error } = await supabase
  .from('users')
  .update({ first_name: 'New Name' })
  .eq('id', userId)
```

### Using Prisma (for complex queries)
```typescript
import { prisma } from '@/backend/config/database'

// Complex query with relations
const courses = await prisma.course.findMany({
  include: {
    instructor: true,
    enrollments: {
      include: {
        student: true
      }
    }
  }
})
```

## Step 8: Row Level Security (RLS)

Your Supabase database has RLS enabled. You may need to create policies for data access:

```sql
-- Example: Allow users to read their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Example: Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

## Step 9: Email Configuration (Optional)

To enable email verification and password reset:

1. Go to your Supabase dashboard
2. Navigate to Authentication > Settings
3. Configure your email settings
4. Add your SMTP credentials

## Step 10: File Storage (Optional)

For file uploads (images, documents):

1. Go to Storage in your Supabase dashboard
2. Create buckets for different file types
3. Set up RLS policies for access control

## Troubleshooting

### Common Issues

1. **Connection Error**: Check your DATABASE_URL and ensure your Supabase project is active
2. **Auth Error**: Verify your Supabase URL and anon key
3. **RLS Error**: Check your Row Level Security policies
4. **Prisma Error**: Run `npm run db:generate` after schema changes

### Useful Commands

```bash
# Check Prisma schema
npx prisma db pull

# View database in Prisma Studio
npm run db:studio

# Reset database (careful!)
npx prisma db push --force-reset
```

## Next Steps

1. Set up email templates in Supabase dashboard
2. Configure RLS policies for your data
3. Set up file storage buckets
4. Test all authentication flows
5. Deploy to production with environment variables

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
