import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    // Create a dummy transporter if email is not configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 587,
        secure: false,
        auth: {
          user: 'dummy',
          pass: 'dummy',
        },
      })
    } else {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // Check if email is configured
      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log(`Email not configured. Would send to ${options.to}: ${options.subject}`)
        return true // Return true to not break the flow
      }

      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@konnectingdots.com',
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      }

      await this.transporter.sendMail(mailOptions)
      console.log(`Email sent successfully to ${options.to}`)
      return true
    } catch (error) {
      console.error('Error sending email:', error)
      return false
    }
  }

  async sendStudentApprovalEmail(studentEmail: string, studentName: string, isApproved: boolean) {
    const subject = isApproved 
      ? 'Account Approved - Welcome to Konnecting Dots!' 
      : 'Account Application Update - Konnecting Dots'

    const html = isApproved 
      ? this.getApprovalEmailTemplate(studentName)
      : this.getRejectionEmailTemplate(studentName)

    return this.sendEmail({
      to: studentEmail,
      subject,
      html
    })
  }

  async sendNewStudentNotification(adminEmail: string, studentName: string, studentEmail: string) {
    const subject = 'New Student Registration Pending Approval'
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Student Registration</h2>
        <p>A new student has registered and is waiting for approval:</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${studentName}</p>
          <p><strong>Email:</strong> ${studentEmail}</p>
          <p><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        <p>Please log in to the admin dashboard to review and approve this student.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin" 
           style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Go to Admin Dashboard
        </a>
      </div>
    `

    return this.sendEmail({
      to: adminEmail,
      subject,
      html
    })
  }

  private getApprovalEmailTemplate(studentName: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Congratulations! Your Account Has Been Approved</h2>
        <p>Dear ${studentName},</p>
        <p>Great news! Your account has been approved and you can now access your student dashboard.</p>
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
          <h3 style="margin-top: 0; color: #16a34a;">Next Steps:</h3>
          <ul>
            <li>Log in to your student dashboard</li>
            <li>Explore available courses</li>
            <li>Complete your profile</li>
            <li>Start your learning journey!</li>
          </ul>
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/student-dashboard" 
           style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Access Your Dashboard
        </a>
        <p style="margin-top: 30px; color: #6b7280;">
          If you have any questions, please don't hesitate to contact us.
        </p>
        <p>Best regards,<br>The Konnecting Dots Team</p>
      </div>
    `
  }

  private getRejectionEmailTemplate(studentName: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Account Application Update</h2>
        <p>Dear ${studentName},</p>
        <p>Thank you for your interest in Konnecting Dots. After careful review, we regret to inform you that your account application could not be approved at this time.</p>
        <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <p style="margin: 0; color: #dc2626;"><strong>What's Next?</strong></p>
          <p style="margin: 10px 0 0 0;">You may reapply in the future. Please ensure all information is complete and accurate.</p>
        </div>
        <p style="margin-top: 30px; color: #6b7280;">
          If you have any questions about this decision, please contact us for more information.
        </p>
        <p>Best regards,<br>The Konnecting Dots Team</p>
      </div>
    `
  }
}

export { EmailService }
