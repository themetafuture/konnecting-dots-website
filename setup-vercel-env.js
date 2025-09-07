#!/usr/bin/env node

// This script helps you set up environment variables for Vercel
// Run with: node setup-vercel-env.js

const fs = require('fs');
const path = require('path');

console.log('🚀 Vercel Environment Variables Setup Helper\n');

// Read environment variables from env.local
const envPath = path.join(__dirname, 'env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ env.local file not found. Please create it first.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

// Parse env.local file
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    const value = valueParts.join('=').replace(/^["']|["']$/g, '');
    envVars[key.trim()] = value.trim();
  }
});

console.log('📋 Environment Variables to Add in Vercel:\n');

const requiredVars = [
  'DATABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL', 
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

requiredVars.forEach(varName => {
  if (envVars[varName]) {
    console.log(`✅ ${varName}`);
    console.log(`   Value: ${envVars[varName]}`);
    console.log(`   Environment: Production, Preview, Development\n`);
  } else {
    console.log(`❌ ${varName} - NOT FOUND in env.local\n`);
  }
});

console.log('🔧 Instructions:');
console.log('1. Go to https://vercel.com/dashboard');
console.log('2. Select your konnecting-dots-website project');
console.log('3. Go to Settings > Environment Variables');
console.log('4. Add each variable above with the values shown');
console.log('5. Make sure to select all environments (Production, Preview, Development)');
console.log('6. Redeploy your project\n');

console.log('📖 For detailed instructions, see VERCEL_ENV_SETUP.md');
