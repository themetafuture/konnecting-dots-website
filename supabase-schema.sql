-- Konnecting Dots Website Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'instructor', 'admin');
CREATE TYPE course_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE enrollment_status AS ENUM ('pending', 'approved', 'rejected', 'completed');
CREATE TYPE progress_status AS ENUM ('not_started', 'in_progress', 'completed');
CREATE TYPE event_type AS ENUM ('workshop', 'seminar', 'conference', 'training');
CREATE TYPE event_status AS ENUM ('scheduled', 'ongoing', 'completed', 'cancelled');
CREATE TYPE blog_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE contact_status AS ENUM ('new', 'read', 'replied', 'closed');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE testimonial_status AS ENUM ('pending', 'approved', 'rejected');

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255), -- Optional since Supabase handles auth
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role user_role DEFAULT 'student',
    avatar TEXT,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    duration_hours INTEGER DEFAULT 0,
    price DECIMAL(10,2) DEFAULT 0,
    status course_status DEFAULT 'draft',
    instructor_id UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course modules table
CREATE TABLE course_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    order_index INTEGER DEFAULT 0,
    is_required BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enrollments table
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES users(id),
    course_id UUID NOT NULL REFERENCES courses(id),
    status enrollment_status DEFAULT 'pending',
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    approved_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    UNIQUE(student_id, course_id)
);

-- Progress table
CREATE TABLE progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
    module_id UUID NOT NULL REFERENCES course_modules(id),
    status progress_status DEFAULT 'not_started',
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    progress_percentage INTEGER DEFAULT 0,
    UNIQUE(enrollment_id, module_id)
);

-- Admin actions table
CREATE TABLE admin_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES users(id),
    action_type VARCHAR(100) NOT NULL,
    target_type VARCHAR(100) NOT NULL,
    target_id UUID NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    location VARCHAR(255),
    type event_type DEFAULT 'workshop',
    status event_status DEFAULT 'scheduled',
    course_id UUID REFERENCES courses(id),
    instructor_id UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    author_id UUID NOT NULL REFERENCES users(id),
    category VARCHAR(100) NOT NULL,
    tags TEXT, -- JSON array as text
    status blog_status DEFAULT 'draft',
    featured BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    service VARCHAR(100),
    status contact_status DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES users(id),
    course_id UUID NOT NULL REFERENCES courses(id),
    amount DECIMAL(10,2) NOT NULL,
    status payment_status DEFAULT 'pending',
    method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES users(id),
    course_id UUID NOT NULL REFERENCES courses(id),
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    status testimonial_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_testimonials_student ON testimonials(student_id);
CREATE INDEX idx_testimonials_status ON testimonials(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access to certain tables
-- Allow public read access to published courses
CREATE POLICY "Public can view published courses" ON courses
    FOR SELECT USING (status = 'published');

-- Allow public read access to published blog posts
CREATE POLICY "Public can view published blog posts" ON blog_posts
    FOR SELECT USING (status = 'published');

-- Allow public read access to upcoming events
CREATE POLICY "Public can view upcoming events" ON events
    FOR SELECT USING (status IN ('scheduled', 'ongoing'));

-- Allow public read access to approved testimonials
CREATE POLICY "Public can view approved testimonials" ON testimonials
    FOR SELECT USING (status = 'approved');

-- Allow public insert access to contact messages
CREATE POLICY "Public can insert contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Allow users to view their own enrollments
CREATE POLICY "Users can view own enrollments" ON enrollments
    FOR SELECT USING (auth.uid() = student_id);

-- Allow users to view their own progress
CREATE POLICY "Users can view own progress" ON progress
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM enrollments 
            WHERE enrollments.id = progress.enrollment_id 
            AND enrollments.student_id = auth.uid()
        )
    );

-- Allow users to view their own payments
CREATE POLICY "Users can view own payments" ON payments
    FOR SELECT USING (auth.uid() = student_id);

-- Allow users to view their own testimonials
CREATE POLICY "Users can view own testimonials" ON testimonials
    FOR SELECT USING (auth.uid() = student_id);

-- Insert some sample data
INSERT INTO users (id, email, first_name, last_name, role, is_active, email_verified) VALUES
    ('00000000-0000-0000-0000-000000000001', 'admin@konnectingdots.com', 'Admin', 'User', 'admin', true, true),
    ('00000000-0000-0000-0000-000000000002', 'instructor@konnectingdots.com', 'John', 'Instructor', 'instructor', true, true),
    ('00000000-0000-0000-0000-000000000003', 'student@konnectingdots.com', 'Jane', 'Student', 'student', true, true);

-- Insert sample courses
INSERT INTO courses (id, title, description, content, duration_hours, price, status, instructor_id) VALUES
    ('10000000-0000-0000-0000-000000000001', 'NLP Practitioner Certification', 'Complete NLP Practitioner Certification Course', 'This comprehensive course covers all aspects of Neuro-Linguistic Programming...', 40, 299.99, 'published', '00000000-0000-0000-0000-000000000002'),
    ('10000000-0000-0000-0000-000000000002', 'Hypnosis Training Workshop', 'Professional Hypnosis Training Workshop', 'Learn the fundamentals of hypnosis and therapeutic techniques...', 16, 199.99, 'published', '00000000-0000-0000-0000-000000000002'),
    ('10000000-0000-0000-0000-000000000003', 'Corporate DEI Training', 'Diversity, Equity & Inclusion Training for Organizations', 'Comprehensive DEI training program for corporate environments...', 24, 499.99, 'published', '00000000-0000-0000-0000-000000000002');

-- Insert sample blog posts
INSERT INTO blog_posts (id, title, content, excerpt, slug, author_id, category, status, featured) VALUES
    ('20000000-0000-0000-0000-000000000001', 'The Power of NLP in Personal Development', 'Neuro-Linguistic Programming (NLP) has revolutionized the way we understand human behavior and communication...', 'Discover how NLP can transform your personal and professional life...', 'power-of-nlp-personal-development', '00000000-0000-0000-0000-000000000002', 'Personal Development', 'published', true),
    ('20000000-0000-0000-0000-000000000002', 'Understanding Hypnosis: Myths vs Reality', 'Hypnosis is often misunderstood and surrounded by myths...', 'Separate fact from fiction about hypnosis and its therapeutic benefits...', 'understanding-hypnosis-myths-reality', '00000000-0000-0000-0000-000000000002', 'Hypnosis', 'published', false);

-- Insert sample events
INSERT INTO events (id, title, description, start_date, end_date, location, type, status, course_id, instructor_id) VALUES
    ('30000000-0000-0000-0000-000000000001', 'NLP Practitioner Workshop', 'Intensive NLP Practitioner Certification Workshop', '2024-02-15 09:00:00+00', '2024-02-18 17:00:00+00', 'Konnecting Dots Training Center', 'workshop', 'scheduled', '10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002'),
    ('30000000-0000-0000-0000-000000000002', 'Hypnosis Masterclass', 'Advanced Hypnosis Techniques Masterclass', '2024-03-10 10:00:00+00', '2024-03-12 16:00:00+00', 'Online', 'seminar', 'scheduled', '10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002');

-- Insert sample testimonials
INSERT INTO testimonials (id, student_id, course_id, content, rating, status) VALUES
    ('40000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'This NLP course completely transformed my understanding of human behavior. Highly recommended!', 5, 'approved'),
    ('40000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000002', 'The hypnosis training was excellent. The instructor was knowledgeable and supportive.', 5, 'approved');
