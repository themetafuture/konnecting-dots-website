# 🚀 Quick Setup Guide - Admin & Student Management System

## ⚡ Fast Setup (5 minutes)

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Setup Database & Create Accounts**
```bash
# This will create SQLite database and all accounts
npm run setup-database
```

### 3. **Start the Application**
```bash
npm run dev
```

### 4. **Test the System**
- **Admin Login**: Go to `/admin-login`
- **Student Login**: Go to `/login`
- **Student Registration**: Go to `/signup`

## 🔐 Test Account Credentials

### **Admin Accounts** (3 accounts)
| Role | Email | Password | Access |
|------|-------|----------|---------|
| **Super Admin** | `superadmin@konnectingdots.com` | `SuperAdmin@2024` | Full access + student approval |
| **Admin** | `admin@konnectingdots.com` | `Admin@2024` | Manage students & courses |
| **Manager** | `manager@konnectingdots.com` | `Manager@2024` | Limited admin access |

### **Student Account** (1 pre-approved)
| Type | Email | Password | Status |
|------|-------|----------|---------|
| **Test Student** | `teststudent@example.com` | `TestStudent@2024` | ✅ Pre-approved with course progress |

## 🎯 Testing Workflow

### **Test Admin Flow:**
1. Go to `/admin-login`
2. Login with Super Admin credentials
3. Should see admin dashboard with student management
4. Go to "Approvals" tab to see pending students
5. Test student approval/rejection functionality

### **Test Student Flow:**
1. Go to `/login`
2. Login with test student credentials
3. Should see student dashboard with course progress
4. View enrolled courses and progress

### **Test Registration Flow:**
1. Go to `/signup`
2. Register a new student
3. Should see "pending approval" message
4. Login as Super Admin to approve the student
5. Student should receive approval email (if configured)

## 🛠️ Troubleshooting

### **Database Connection Issues:**
- The system now uses SQLite (local file database)
- No external database setup required
- Database file: `prisma/dev.db`

### **Login Issues:**
- Make sure you're using the correct login page:
  - Admin: `/admin-login` (not `/login`)
  - Student: `/login` (not `/admin-login`)

### **Account Issues:**
- Run `npm run setup-database` to recreate all accounts
- Check console logs for detailed error messages

### **Email Issues:**
- Email service is optional and has graceful fallback
- Check console logs for email status
- System works without email configuration

## 📱 Features to Test

### **Admin Dashboard:**
- [ ] Student management and approval
- [ ] Course management
- [ ] Analytics and statistics
- [ ] Pending approvals workflow

### **Student Dashboard:**
- [ ] Course progress tracking
- [ ] Certificate management
- [ ] Profile management
- [ ] Learning statistics

### **Authentication:**
- [ ] Role-based access control
- [ ] Admin vs student redirects
- [ ] Account approval workflow
- [ ] Secure password handling

## 🔧 Development Commands

```bash
# Database management
npm run db:push          # Push schema to database
npm run db:generate      # Generate Prisma client
npm run db:studio        # Open database browser

# Account management
npm run setup-database   # Full setup (recommended)
npm run create-admin-accounts  # Admin accounts only
npm run create-test-student    # Test student only

# Development
npm run dev              # Start development server
npm run build            # Build for production
```

## 📊 Database Schema

The system uses SQLite with the following key tables:
- `users` - User accounts with roles
- `student_approvals` - Student approval requests
- `courses` - Course catalog
- `enrollments` - Student course enrollments
- `progress` - Student learning progress
- `payments` - Payment records
- `events` - Course events and workshops

## 🎉 Success Indicators

You'll know the system is working when:
- ✅ Admin login redirects to admin dashboard
- ✅ Student login redirects to student dashboard
- ✅ Super admin can approve/reject students
- ✅ Approved students can access their dashboard
- ✅ Pending students cannot access dashboard
- ✅ All navigation links work correctly

## 🆘 Need Help?

1. **Check console logs** for detailed error messages
2. **Run setup again** with `npm run setup-database`
3. **Verify database** with `npm run db:studio`
4. **Check file permissions** for SQLite database

The system is designed to work out-of-the-box with minimal configuration! 🚀
