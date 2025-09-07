import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdminAccounts() {
  try {
    console.log('Creating admin accounts...')

    // Create Super Admin
    const superAdminPassword = await bcrypt.hash('SuperAdmin@2024', 12)
    const superAdmin = await prisma.user.upsert({
      where: { email: 'superadmin@konnectingdots.com' },
      update: {},
      create: {
        email: 'superadmin@konnectingdots.com',
        password: superAdminPassword,
        firstName: 'Super',
        lastName: 'Admin',
        role: 'super_admin',
        isActive: true,
        emailVerified: true,
        isApproved: true,
        approvedAt: new Date(),
      },
    })
    console.log('Super Admin created:', superAdmin.email)

    // Create Admin
    const adminPassword = await bcrypt.hash('Admin@2024', 12)
    const admin = await prisma.user.upsert({
      where: { email: 'admin@konnectingdots.com' },
      update: {},
      create: {
        email: 'admin@konnectingdots.com',
        password: adminPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isActive: true,
        emailVerified: true,
        isApproved: true,
        approvedAt: new Date(),
      },
    })
    console.log('Admin created:', admin.email)

    // Create Manager
    const managerPassword = await bcrypt.hash('Manager@2024', 12)
    const manager = await prisma.user.upsert({
      where: { email: 'manager@konnectingdots.com' },
      update: {},
      create: {
        email: 'manager@konnectingdots.com',
        password: managerPassword,
        firstName: 'Manager',
        lastName: 'User',
        role: 'manager',
        isActive: true,
        emailVerified: true,
        isApproved: true,
        approvedAt: new Date(),
      },
    })
    console.log('Manager created:', manager.email)

    console.log('All admin accounts created successfully!')
    console.log('\nLogin credentials:')
    console.log('Super Admin: superadmin@konnectingdots.com / SuperAdmin@2024')
    console.log('Admin: admin@konnectingdots.com / Admin@2024')
    console.log('Manager: manager@konnectingdots.com / Manager@2024')

  } catch (error) {
    console.error('Error creating admin accounts:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminAccounts()
