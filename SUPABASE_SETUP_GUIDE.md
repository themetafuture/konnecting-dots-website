# Supabase Setup Guide for Konnecting Dots Website

## 🚀 Quick Setup Steps

### 1. Environment Configuration
The environment variables have been updated with your new Supabase credentials:

- **Project URL**: `https://pdqehaxghfahiviajlza.supabase.co`
- **Project ID**: `pdqehaxghfahiviajlza`
- **Database Password**: `KenanWilliams2025`

### 2. Database Schema Setup

1. **Go to your Supabase Dashboard**:
   - Visit: https://supabase.com/dashboard
   - Select your project: `pdqehaxghfahiviajlza`

2. **Open SQL Editor**:
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Schema**:
   - Copy the entire contents of `supabase-schema.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute the schema

### 3. Verify Setup

Run the setup verification script:

```bash
node setup-supabase.js
```

This will:
- Test the database connection
- Check if all tables exist
- Verify sample data

### 4. Environment Files

Make sure you have the correct environment variables:

**Create `.env.local` file** (copy from `env.local`):
```bash
cp env.local .env.local
```

**Or manually create `.env.local`**:
```env
NEXT_PUBLIC_SUPABASE_URL="https://pdqehaxghfahiviajlza.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkcWVoYXhnaGZhaGl2aWFqbHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyMzQ3MDEsImV4cCI6MjA3MjgxMDcwMX0.PFU6JHMkaPXLlXUCrHcWUN9UVX_ZuRdDuOpA6Hy-MMQ"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkcWVoYXhnaGZhaGl2aWFqbHphIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzIzNDcwMSwiZXhwIjoyMDcyODEwNzAxfQ.RdodQscCbllvLuM3VGK7H2rtcC2pez6T8x-ycLP4k6w"
DATABASE_URL="postgresql://postgres:KenanWilliams2025@db.pdqehaxghfahiviajlza.supabase.co:5432/postgres?sslmode=require"
```

### 5. Database Connection Types

Your Supabase project supports multiple connection types:

**Direct Connection** (for Prisma):
```
postgresql://postgres:KenanWilliams2025@db.pdqehaxghfahiviajlza.supabase.co:5432/postgres
```

**Transaction Pooler** (for high-concurrency apps):
```
postgresql://postgres.pdqehaxghfahiviajlza:KenanWilliams2025@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
```

**Session Pooler** (for connection pooling):
```
postgresql://postgres.pdqehaxghfahiviajlza:KenanWilliams2025@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
```

### 6. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to test your website.

## 📊 Database Tables Created

The schema creates the following tables:

1. **users** - User profiles and authentication
2. **courses** - Training courses and programs
3. **course_modules** - Individual course modules/lessons
4. **enrollments** - Student course enrollments
5. **progress** - Student progress tracking
6. **admin_actions** - Admin activity logging
7. **events** - Workshops, seminars, and events
8. **blog_posts** - Blog content management
9. **contact_messages** - Contact form submissions
10. **payments** - Payment processing records
11. **testimonials** - Student testimonials and reviews

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Public access policies** for published content
- **User-specific policies** for private data
- **Authentication integration** with Supabase Auth

## 🧪 Testing the Setup

1. **Test Database Connection**:
   ```bash
   node setup-supabase.js
   ```

2. **Test Website Features**:
   - Visit the homepage
   - Check course listings
   - Test contact form
   - View blog posts
   - Check events page

## 🚨 Troubleshooting

### Common Issues:

1. **Connection Failed**:
   - Check if `.env.local` exists and has correct values
   - Verify Supabase project is active
   - Check if database password is correct

2. **Tables Not Found**:
   - Run the SQL schema in Supabase SQL Editor
   - Check for any SQL errors in the execution

3. **Authentication Issues**:
   - Verify anon key is correct
   - Check service role key for admin operations

4. **Environment Variables**:
   - Make sure `.env.local` is in the root directory
   - Restart your development server after changes

### Getting Help:

- Check Supabase logs in the dashboard
- Review the browser console for errors
- Run the setup script for diagnostics

## ✅ Success Indicators

You'll know the setup is working when:

- ✅ Setup script runs without errors
- ✅ Website loads without database errors
- ✅ Course listings display properly
- ✅ Contact form submits successfully
- ✅ Blog posts are visible
- ✅ Events page shows upcoming events

## 🔄 Next Steps

After successful setup:

1. **Customize Content**: Update sample data with your actual content
2. **Configure Authentication**: Set up user registration/login flows
3. **Add Payment Integration**: Configure payment processing
4. **Deploy**: Deploy to production with proper environment variables
5. **Monitor**: Set up monitoring and analytics

---

**Need Help?** Check the Supabase documentation or contact support if you encounter any issues.
