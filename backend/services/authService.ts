import { prisma } from '../config/database'
import { hashPassword, verifyPassword, generateToken } from '../utils/auth'
import { createError } from '../middleware/error'
import { registerSchema, loginSchema } from '../utils/validation'

export class AuthService {
  async register(data: any) {
    const validatedData = registerSchema.parse(data)
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      throw createError('User with this email already exists', 409)
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Create user
    const user = await prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        avatar: true,
        createdAt: true,
      }
    })

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    return { user, token }
  }

  async login(data: any) {
    const validatedData = loginSchema.parse(data)

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (!user || !user.isActive) {
      throw createError('Invalid credentials', 401)
    }

    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.password)
    if (!isValidPassword) {
      throw createError('Invalid credentials', 401)
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
      },
      token
    }
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    if (!user) {
      throw createError('User not found', 404)
    }

    return user
  }

  async updateProfile(userId: string, data: any) {
    const validatedData = registerSchema.partial().parse(data)

    const user = await prisma.user.update({
      where: { id: userId },
      data: validatedData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        avatar: true,
        updatedAt: true,
      }
    })

    return user
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw createError('User not found', 404)
    }

    // Verify current password
    const isValidPassword = await verifyPassword(currentPassword, user.password)
    if (!isValidPassword) {
      throw createError('Current password is incorrect', 400)
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword)

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    })

    return { message: 'Password updated successfully' }
  }

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if user exists or not
      return { message: 'If an account with that email exists, we sent a password reset link.' }
    }

    // TODO: Implement email service for password reset
    // For now, just return success message
    return { message: 'If an account with that email exists, we sent a password reset link.' }
  }

  async resetPassword(token: string, newPassword: string) {
    // TODO: Implement token verification and password reset
    // This would typically involve verifying a reset token
    throw createError('Password reset not implemented yet', 501)
  }
}
