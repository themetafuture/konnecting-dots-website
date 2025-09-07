# Test Accounts for Admin and Student Management System

## 🔐 Admin Accounts

### 1. Super Admin (Full Access)
- **Email**: `superadmin@konnectingdots.com`
- **Password**: `SuperAdmin@2024`
- **Access**: `/admin-login` → `/admin`
- **Permissions**: 
  - ✅ Approve/reject student accounts
  - ✅ Full admin dashboard access
  - ✅ Manage all students and courses

### 2. Admin (Management Access)
- **Email**: `admin@konnectingdots.com`
- **Password**: `Admin@2024`
- **Access**: `/admin-login` → `/admin`
- **Permissions**:
  - ✅ Manage students and courses
  - ✅ View admin dashboard
  - ❌ Cannot approve/reject students

### 3. Manager (Limited Access)
- **Email**: `manager@konnectingdots.com`
- **Password**: `Manager@2024`
- **Access**: `/admin-login` → `/admin`
- **Permissions**:
  - ✅ Limited admin dashboard access
  - ✅ View students and courses
  - ❌ Cannot approve/reject students

## 👨‍🎓 Student Accounts

### 1. Test Student (Pre-approved)
- **Email**: `teststudent@example.com`
- **Password**: `TestStudent@2024`
- **Access**: `/login` → `/student-dashboard`
- **Status**: ✅ Pre-approved and active
- **Enrolled**: NLP Practitioner Certification course
- **Progress**: 2 modules completed, 1 in progress

### 2. Pending Student (Requires Approval)
- **Email**: `pendingstudent@example.com`
- **Password**: `PendingStudent@2024`
- **Access**: `/signup` → Wait for approval
- **Status**: ⏳ Pending super admin approval
- **Note**: Register at `/signup` to test approval workflow

## 🚀 How to Test the System

### Testing Admin Flow:
1. Go to `/admin-login`
2. Login with any admin account
3. Should redirect to `/admin` dashboard
4. Test student approval functionality

### Testing Student Flow:
1. **Pre-approved student**: Go to `/login` → Use test student credentials
2. **New student**: Go to `/signup` → Register new student → Wait for approval

### Testing Approval Workflow:
1. Login as Super Admin (`superadmin@konnectingdots.com`)
2. Go to Admin Dashboard → Approvals tab
3. Approve/reject pending students
4. Check email notifications (if configured)

## 📧 Email Testing

If email is configured, you'll receive:
- **New student registration** notifications to super admin
- **Student approval/rejection** emails to students

## 🔧 Setup Commands

```bash
# Create admin accounts
npm run create-admin-accounts

# Create test student account
npm run create-test-student

# Run database migrations
npm run db:push
```

## 🐛 Troubleshooting

### Admin Login Issues:
- Make sure you're using `/admin-login` not `/login`
- Check that admin accounts were created successfully
- Verify database connection

### Student Dashboard Issues:
- Ensure student is approved (`isApproved: true`)
- Check that student has active status (`isActive: true`)
- Verify course enrollments exist

### Email Issues:
- Check SMTP configuration in environment variables
- Email service will log to console if not configured
- System works without email (graceful fallback)

## 📱 Quick Test Checklist

- [ ] Admin login redirects to admin dashboard
- [ ] Student login redirects to student dashboard
- [ ] Student registration creates pending account
- [ ] Super admin can approve/reject students
- [ ] Approved students can access dashboard
- [ ] Pending students cannot access dashboard
- [ ] Email notifications work (if configured)
