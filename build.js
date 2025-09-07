#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Starting build process...');

try {
  // Check if Prisma schema exists
  const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
  if (!fs.existsSync(schemaPath)) {
    console.log('❌ Prisma schema not found, skipping Prisma generation');
  } else {
    console.log('📦 Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Prisma client generated successfully');
  }
} catch (error) {
  console.log('⚠️  Prisma generation failed, continuing with build:', error.message);
}

try {
  console.log('🏗️  Building Next.js application...');
  execSync('next build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
