import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let prisma: PrismaClient

try {
  prisma = globalForPrisma.prisma ?? new PrismaClient()
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
} catch (error) {
  console.log('Prisma client not available:', error)
  // Create a mock prisma client for development
  prisma = {} as PrismaClient
}

export { prisma }
