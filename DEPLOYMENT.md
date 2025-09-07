# Konnecting Dots Website - Deployment Guide

## Overview
This guide provides step-by-step instructions for deploying the Konnecting Dots website to production.

## Prerequisites
- Node.js 18+ installed
- pnpm package manager
- Database (PostgreSQL recommended for production)
- Domain name and hosting provider
- SSL certificate

## Environment Setup

### 1. Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/konnecting_dots"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# Email Configuration (for contact forms and notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Next.js Configuration
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-nextauth-secret"

# File Upload (if using cloud storage)
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"

# Analytics (optional)
GOOGLE_ANALYTICS_ID="GA-XXXXXXXXX"
```

### 2. Database Setup
1. Create a PostgreSQL database
2. Run database migrations:
   ```bash
   pnpm db:push
   pnpm db:seed
   ```

## Deployment Options

### Option 1: Vercel (Recommended)
1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   - Add all environment variables from `.env.local`
   - Set `NEXTAUTH_URL` to your production domain

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - Custom domain can be added in project settings

### Option 2: Netlify
1. **Build Configuration**
   - Build command: `pnpm build`
   - Publish directory: `.next`

2. **Environment Variables**
   - Add all environment variables in Netlify dashboard

3. **Deploy**
   - Connect GitHub repository
   - Deploy automatically on push

### Option 3: Self-Hosted (VPS/Cloud Server)

#### Using PM2 (Process Manager)
1. **Install Dependencies**
   ```bash
   pnpm install --production
   pnpm build
   ```

2. **Install PM2**
   ```bash
   npm install -g pm2
   ```

3. **Create PM2 Ecosystem File**
   ```javascript
   // ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'konnecting-dots',
       script: 'pnpm',
       args: 'start',
       cwd: '/path/to/your/app',
       instances: 'max',
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   }
   ```

4. **Start Application**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

#### Using Docker
1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base
   
   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   
   # Install dependencies based on the preferred package manager
   COPY package.json pnpm-lock.yaml* ./
   RUN corepack enable pnpm && pnpm i --frozen-lockfile
   
   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   
   # Next.js collects completely anonymous telemetry data about general usage.
   ENV NEXT_TELEMETRY_DISABLED 1
   
   RUN corepack enable pnpm && pnpm build
   
   # Production image, copy all the files and run next
   FROM base AS runner
   WORKDIR /app
   
   ENV NODE_ENV production
   ENV NEXT_TELEMETRY_DISABLED 1
   
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   
   COPY --from=builder /app/public ./public
   
   # Set the correct permission for prerender cache
   RUN mkdir .next
   RUN chown nextjs:nodejs .next
   
   # Automatically leverage output traces to reduce image size
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   
   USER nextjs
   
   EXPOSE 3000
   
   ENV PORT 3000
   ENV HOSTNAME "0.0.0.0"
   
   CMD ["node", "server.js"]
   ```

2. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - DATABASE_URL=postgresql://user:password@db:5432/konnecting_dots
       depends_on:
         - db
     
     db:
       image: postgres:15
       environment:
         - POSTGRES_DB=konnecting_dots
         - POSTGRES_USER=user
         - POSTGRES_PASSWORD=password
       volumes:
         - postgres_data:/var/lib/postgresql/data
   
   volumes:
     postgres_data:
   ```

3. **Deploy with Docker**
   ```bash
   docker-compose up -d
   ```

## Post-Deployment Checklist

### 1. Database Verification
- [ ] Database connection working
- [ ] All tables created
- [ ] Seed data loaded
- [ ] Admin user created

### 2. Authentication
- [ ] User registration working
- [ ] User login working
- [ ] Password reset working
- [ ] Admin login working

### 3. Forms
- [ ] Contact form submissions
- [ ] Booking form submissions
- [ ] Email notifications working

### 4. Admin Dashboard
- [ ] Admin dashboard accessible
- [ ] Student management working
- [ ] Course management working
- [ ] Payment management working
- [ ] Approval system working

### 5. Performance
- [ ] Page load times < 3 seconds
- [ ] Images optimized
- [ ] CDN configured (if applicable)

### 6. Security
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database credentials secured
- [ ] JWT secrets strong and unique

## Monitoring and Maintenance

### 1. Logs
- Monitor application logs for errors
- Set up log rotation
- Configure log aggregation (if needed)

### 2. Backups
- Regular database backups
- File upload backups
- Configuration backups

### 3. Updates
- Regular dependency updates
- Security patches
- Feature updates

### 4. Performance Monitoring
- Set up monitoring (e.g., Vercel Analytics, Google Analytics)
- Monitor server resources
- Track user engagement

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check DATABASE_URL format
   - Verify database server is running
   - Check network connectivity

2. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check token expiration settings
   - Verify cookie settings

3. **Email Not Working**
   - Check SMTP credentials
   - Verify email service provider settings
   - Check spam folders

4. **Build Errors**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall
   - Check for TypeScript errors

### Support
For technical support, contact:
- Email: tech@konnectingdots.com
- Documentation: [Internal Wiki]
- Issue Tracker: [GitHub Issues]

## Security Considerations

1. **Environment Variables**
   - Never commit .env files
   - Use strong, unique secrets
   - Rotate secrets regularly

2. **Database Security**
   - Use strong passwords
   - Enable SSL connections
   - Regular security updates

3. **Application Security**
   - Keep dependencies updated
   - Implement rate limiting
   - Use HTTPS everywhere
   - Regular security audits

## Scaling Considerations

1. **Database**
   - Consider read replicas for high traffic
   - Implement connection pooling
   - Monitor query performance

2. **Application**
   - Use CDN for static assets
   - Implement caching strategies
   - Consider microservices for complex features

3. **Infrastructure**
   - Load balancing for multiple instances
   - Auto-scaling based on traffic
   - Monitoring and alerting

---

**Last Updated:** January 2024
**Version:** 1.0.0
