# Vercel Environment Variables Setup Guide

## 🚨 Current Issue
The deployment is failing because Vercel is looking for secrets that don't exist. We need to set up the environment variables properly.

## 🔧 How to Fix This

### Step 1: Go to Your Vercel Project Settings

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your `konnecting-dots-website` project
3. Go to the **Settings** tab
4. Click on **Environment Variables** in the left sidebar

### Step 2: Add the Required Environment Variables

Add these environment variables one by one:

#### 1. DATABASE_URL
- **Name**: `DATABASE_URL`
- **Value**: `postgresql://postgres:KenanWilliams2025@db.pdqehaxghfahiviajlza.supabase.co:5432/postgres?sslmode=require`
- **Environment**: Production, Preview, Development (select all)

#### 2. NEXT_PUBLIC_SUPABASE_URL
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://pdqehaxghfahiviajlza.supabase.co`
- **Environment**: Production, Preview, Development (select all)

#### 3. NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkcWVoYXhnaGZhaGl2aWFqbHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyMzQ3MDEsImV4cCI6MjA3MjgxMDcwMX0.PFU6JHMkaPXLlXUCrHcWUN9UVX_ZuRdDuOpA6Hy-MMQ`
- **Environment**: Production, Preview, Development (select all)

#### 4. SUPABASE_SERVICE_ROLE_KEY
- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkcWVoYXhnaGZhaGl2aWFqbHphIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzIzNDcwMSwiZXhwIjoyMDcyODEwNzAxfQ.RdodQscCbllvLuM3VGK7H2rtcC2pez6T8x-ycLP4k6w`
- **Environment**: Production, Preview, Development (select all)

### Step 3: Optional Environment Variables

You can also add these optional variables:

#### JWT_SECRET
- **Name**: `JWT_SECRET`
- **Value**: `your-super-secret-jwt-key-here-make-it-long-and-random`
- **Environment**: Production, Preview, Development (select all)

#### NEXTAUTH_URL
- **Name**: `NEXTAUTH_URL`
- **Value**: `https://your-domain.vercel.app` (replace with your actual domain)
- **Environment**: Production, Preview, Development (select all)

#### NEXTAUTH_SECRET
- **Name**: `NEXTAUTH_SECRET`
- **Value**: `your-nextauth-secret-key-here`
- **Environment**: Production, Preview, Development (select all)

### Step 4: Redeploy

After adding all the environment variables:

1. Go back to the **Deployments** tab
2. Click on the **Redeploy** button for your latest deployment
3. Or push a new commit to trigger a new deployment

## 🔍 Verification

After redeployment, check:

1. **Build Logs**: Should show successful Prisma generation
2. **Runtime Logs**: Should show successful database connection
3. **Admin Dashboard**: Should load without errors at `/admin`

## 🚨 Important Notes

- **Never commit these values to your repository**
- **The values shown above are from your `env.local` file**
- **Make sure to select all environments (Production, Preview, Development)**
- **After adding variables, you must redeploy for them to take effect**

## 🆘 If You Still Have Issues

1. **Check the build logs** in Vercel dashboard
2. **Verify all environment variables are set correctly**
3. **Make sure the Supabase database is accessible**
4. **Check if the Prisma schema matches your Supabase database structure**

## 📞 Quick Test

Once deployed, test these endpoints:
- `https://your-domain.vercel.app/api/admin/dashboard` - Should return mock data
- `https://your-domain.vercel.app/` - Should load the homepage
- `https://your-domain.vercel.app/admin` - Should load the admin page
