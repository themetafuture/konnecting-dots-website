# Konnecting Dots Website

A comprehensive learning management system and corporate training platform built with Next.js 14, featuring NLP, Hypnosis, and Corporate Training programs.

## 🚀 Features

### Core Functionality
- **Complete Authentication System** - User registration, login, password reset
- **Student Portal** - Video library, audio tracks, downloadable materials, certificates
- **Admin Dashboard** - Comprehensive management with approval workflows
- **Course Management** - Full CRUD operations for courses and content
- **Payment Processing** - Integrated payment handling and management
- **Contact & Booking Forms** - Functional forms with email notifications
- **Search Functionality** - Global search across courses, blog posts, and events
- **Video Player** - Custom video player with progress tracking
- **Download Manager** - Track and manage downloadable materials

### Pages & Components
- ✅ Homepage with hero section and service overview
- ✅ About page with company information
- ✅ Services pages (One-on-One, Corporate, DEI, Train-the-Trainer, Practitioner)
- ✅ Contact page with functional contact form
- ✅ Blog with featured and recent posts
- ✅ Events page with upcoming events
- ✅ Resources page with downloadable materials
- ✅ Testimonials page with success stories
- ✅ FAQ page with common questions
- ✅ Privacy Policy, Terms of Service, Cookie Policy
- ✅ Login/Signup pages with full authentication
- ✅ Admin dashboard with comprehensive management tools

### Technical Features
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type Safety** - Full TypeScript implementation
- **Database Integration** - Prisma ORM with SQLite/PostgreSQL
- **Form Validation** - Zod schema validation
- **State Management** - React hooks and context
- **UI Components** - Radix UI with custom styling
- **Email Integration** - Nodemailer for notifications
- **File Upload** - Multer for handling file uploads
- **Security** - JWT authentication, password hashing, CSRF protection

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS, Radix UI
- **Database:** Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **Authentication:** JWT with bcryptjs
- **Email:** Nodemailer
- **File Upload:** Multer
- **Validation:** Zod
- **Icons:** Lucide React

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm package manager
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/konnecting-dots-website.git
   cd konnecting-dots-website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key"
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=587
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   ```

4. **Set up the database**
   ```bash
   pnpm db:push
   pnpm db:seed
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application uses Prisma ORM with the following main models:

- **User** - Student, instructor, and admin accounts
- **Course** - Training programs and courses
- **Enrollment** - Student course enrollments
- **Event** - Workshops, seminars, and training events
- **Session** - Individual coaching and training sessions
- **Payment** - Payment records and transactions
- **BlogPost** - Blog articles and content
- **Testimonial** - Student success stories
- **Contact** - Contact form submissions

## 🎯 User Roles

### Student
- Access to enrolled courses
- Video library and materials
- Download certificates
- Book sessions
- Submit testimonials

### Instructor
- Manage assigned courses
- View student progress
- Schedule sessions
- Access teaching materials

### Admin
- Full system access
- User management
- Course management
- Payment processing
- Approval workflows
- Analytics and reporting

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/[id]` - Get course details
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/[id]` - Update course (admin)

### Students
- `GET /api/students` - List students (admin)
- `GET /api/students/[id]` - Get student details
- `PUT /api/students/[id]` - Update student (admin)

### Contact & Booking
- `POST /api/contact` - Submit contact form
- `POST /api/booking` - Book a session

### Admin
- `GET /api/admin/dashboard` - Dashboard data
- `GET /api/admin/approvals` - Pending approvals

## 🎨 Customization

### Styling
The application uses Tailwind CSS with custom components. Key customization points:

- **Colors:** Update `tailwind.config.ts` for brand colors
- **Components:** Modify components in `/components/ui/`
- **Layout:** Update layout components in `/components/`

### Content
- **Courses:** Add/modify courses in the admin dashboard
- **Blog Posts:** Manage blog content through the admin interface
- **Events:** Schedule events through the admin dashboard
- **Testimonials:** Approve testimonials in the admin panel

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CSRF protection
- Input validation with Zod
- SQL injection prevention with Prisma
- XSS protection
- Secure cookie handling

## 📊 Performance

- Server-side rendering (SSR)
- Static generation where possible
- Image optimization
- Code splitting
- Lazy loading
- CDN ready

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## 📈 Analytics

The application includes:
- Google Analytics integration
- User engagement tracking
- Course completion tracking
- Admin dashboard analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@konnectingdots.com
- Documentation: [Internal Wiki]
- Issues: [GitHub Issues](https://github.com/your-username/konnecting-dots-website/issues)

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core functionality implementation
- ✅ Authentication system
- ✅ Admin dashboard
- ✅ Basic course management

### Phase 2 (Planned)
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Video streaming optimization
- [ ] Advanced payment processing
- [ ] Multi-language support

### Phase 3 (Future)
- [ ] AI-powered recommendations
- [ ] Advanced reporting
- [ ] Integration with external LMS
- [ ] Advanced video features

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Radix UI for accessible components
- Tailwind CSS for utility-first styling
- Prisma for the excellent ORM
- All contributors and supporters

---

**Built with ❤️ by the Konnecting Dots Team**

*Last Updated: January 2024*
