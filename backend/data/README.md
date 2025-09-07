# Data Directory Structure

This directory contains all the data files and uploads for the Konnecting Dots website.

## Directory Structure

```
data/
├── courses/           # Course materials and content
│   ├── nlp/          # NLP course materials
│   ├── hypnosis/     # Hypnosis course materials
│   ├── corporate/    # Corporate training materials
│   ├── dei/          # DEI training materials
│   └── practitioner/ # Practitioner course materials
├── students/         # Student data and progress files
│   ├── profiles/     # Student profile images
│   ├── certificates/ # Completion certificates
│   └── progress/     # Progress tracking files
├── events/           # Event materials and schedules
│   ├── workshops/    # Workshop materials
│   ├── seminars/     # Seminar materials
│   ├── conferences/  # Conference materials
│   └── schedules/    # Event schedules
├── blog/             # Blog content and media
│   ├── images/       # Blog post images
│   ├── featured/     # Featured post images
│   └── drafts/       # Draft content
├── testimonials/     # Client testimonials
│   ├── images/       # Testimonial photos
│   └── videos/       # Video testimonials
├── uploads/          # General file uploads
│   ├── images/       # General images
│   ├── documents/    # PDFs and documents
│   └── videos/       # Video files
└── backups/          # Database and file backups
```

## File Organization Rules

1. **Courses**: Organize by course type and level
2. **Students**: Keep student data secure and organized by enrollment date
3. **Events**: Group by event type and date
4. **Blog**: Organize by category and publication date
5. **Uploads**: Use descriptive filenames and organize by file type

## Security

- Student data is protected and access is restricted
- Sensitive information is encrypted
- Regular backups are maintained
- File access is logged and monitored

## File Naming Conventions

- Use lowercase with hyphens: `course-material-1.pdf`
- Include date for time-sensitive files: `workshop-2024-01-15.pdf`
- Use descriptive names: `nlp-anchoring-techniques.pdf`
- Avoid special characters and spaces
