// Environment variable validation for build time
export function validateEnvironment() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'DATABASE_URL'
  ]

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    console.warn('⚠️  Missing environment variables:', missingVars.join(', '))
    console.warn('Build will continue with mock data')
    return false
  }
  
  return true
}

// Check if we're in a build environment where env vars might not be available
export function isBuildTime() {
  return process.env.NODE_ENV === 'production' && !process.env.VERCEL
}

export function isProduction() {
  return process.env.NODE_ENV === 'production'
}

export function isDevelopment() {
  return process.env.NODE_ENV === 'development'
}
