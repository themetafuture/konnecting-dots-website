#!/usr/bin/env node

/**
 * Integration Test Script for Konnecting Dots Backend
 * 
 * This script tests the complete backend integration including:
 * - Database connection
 * - API endpoints
 * - Authentication flow
 * - Data operations
 */

const fetch = require('node-fetch')

const BASE_URL = 'http://localhost:3000'
let authToken = null

// Test data
const testUser = {
  email: 'test@example.com',
  password: 'testpassword123',
  firstName: 'Test',
  lastName: 'User'
}

const testCourse = {
  title: 'Test Course',
  description: 'A test course for integration testing',
  price: 199.99,
  duration: 10,
  level: 'BEGINNER',
  category: 'NLP'
}

async function makeRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
      ...options.headers
    },
    ...options
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()
    return { response, data }
  } catch (error) {
    console.error(`❌ Request failed for ${endpoint}:`, error.message)
    return { response: null, data: null, error }
  }
}

async function testHealthCheck() {
  console.log('🔍 Testing health check...')
  const { response, data } = await makeRequest('/api/test')
  
  if (response && response.ok && data.success) {
    console.log('✅ Health check passed')
    console.log(`   Database: ${data.data.database}`)
    console.log(`   Users: ${data.data.counts.users}`)
    console.log(`   Courses: ${data.data.counts.courses}`)
    return true
  } else {
    console.log('❌ Health check failed')
    return false
  }
}

async function testUserRegistration() {
  console.log('🔍 Testing user registration...')
  const { response, data } = await makeRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(testUser)
  })
  
  if (response && response.ok && data.success) {
    console.log('✅ User registration successful')
    authToken = data.data.token
    return true
  } else {
    console.log('❌ User registration failed:', data?.error)
    return false
  }
}

async function testUserLogin() {
  console.log('🔍 Testing user login...')
  const { response, data } = await makeRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: testUser.email,
      password: testUser.password
    })
  })
  
  if (response && response.ok && data.success) {
    console.log('✅ User login successful')
    authToken = data.data.token
    return true
  } else {
    console.log('❌ User login failed:', data?.error)
    return false
  }
}

async function testProfileAccess() {
  console.log('🔍 Testing profile access...')
  const { response, data } = await makeRequest('/api/auth/profile')
  
  if (response && response.ok && data.success) {
    console.log('✅ Profile access successful')
    console.log(`   User: ${data.data.firstName} ${data.data.lastName}`)
    return true
  } else {
    console.log('❌ Profile access failed:', data?.error)
    return false
  }
}

async function testCourseCreation() {
  console.log('🔍 Testing course creation...')
  const { response, data } = await makeRequest('/api/courses', {
    method: 'POST',
    body: JSON.stringify(testCourse)
  })
  
  if (response && response.ok && data.success) {
    console.log('✅ Course creation successful')
    console.log(`   Course: ${data.data.title}`)
    return data.data.id
  } else {
    console.log('❌ Course creation failed:', data?.error)
    return null
  }
}

async function testCourseRetrieval() {
  console.log('🔍 Testing course retrieval...')
  const { response, data } = await makeRequest('/api/courses')
  
  if (response && response.ok && data.success) {
    console.log('✅ Course retrieval successful')
    console.log(`   Found ${data.data.courses.length} courses`)
    return true
  } else {
    console.log('❌ Course retrieval failed:', data?.error)
    return false
  }
}

async function testBlogRetrieval() {
  console.log('🔍 Testing blog retrieval...')
  const { response, data } = await makeRequest('/api/blog')
  
  if (response && response.ok && data.success) {
    console.log('✅ Blog retrieval successful')
    console.log(`   Found ${data.data.blogPosts.length} blog posts`)
    return true
  } else {
    console.log('❌ Blog retrieval failed:', data?.error)
    return false
  }
}

async function testEventsRetrieval() {
  console.log('🔍 Testing events retrieval...')
  const { response, data } = await makeRequest('/api/events')
  
  if (response && response.ok && data.success) {
    console.log('✅ Events retrieval successful')
    console.log(`   Found ${data.data.events.length} events`)
    return true
  } else {
    console.log('❌ Events retrieval failed:', data?.error)
    return false
  }
}

async function testAdminDashboard() {
  console.log('🔍 Testing admin dashboard...')
  const { response, data } = await makeRequest('/api/admin/dashboard')
  
  if (response && response.ok && data.success) {
    console.log('✅ Admin dashboard access successful')
    console.log(`   Students: ${data.data.students.totalStudents}`)
    console.log(`   Blog posts: ${data.data.blog.totalPosts}`)
    return true
  } else {
    console.log('❌ Admin dashboard access failed:', data?.error)
    return false
  }
}

async function runAllTests() {
  console.log('🚀 Starting Konnecting Dots Backend Integration Tests\n')
  
  const tests = [
    { name: 'Health Check', fn: testHealthCheck },
    { name: 'User Registration', fn: testUserRegistration },
    { name: 'User Login', fn: testUserLogin },
    { name: 'Profile Access', fn: testProfileAccess },
    { name: 'Course Creation', fn: testCourseCreation },
    { name: 'Course Retrieval', fn: testCourseRetrieval },
    { name: 'Blog Retrieval', fn: testBlogRetrieval },
    { name: 'Events Retrieval', fn: testEventsRetrieval },
    { name: 'Admin Dashboard', fn: testAdminDashboard },
  ]
  
  let passed = 0
  let failed = 0
  
  for (const test of tests) {
    try {
      const result = await test.fn()
      if (result) {
        passed++
      } else {
        failed++
      }
    } catch (error) {
      console.log(`❌ ${test.name} failed with error:`, error.message)
      failed++
    }
    console.log('') // Add spacing between tests
  }
  
  console.log('📊 Test Results:')
  console.log(`   ✅ Passed: ${passed}`)
  console.log(`   ❌ Failed: ${failed}`)
  console.log(`   📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`)
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! Your backend is working correctly.')
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.')
  }
}

// Check if server is running
async function checkServer() {
  try {
    const { response } = await makeRequest('/api/test')
    return response && response.ok
  } catch (error) {
    return false
  }
}

async function main() {
  console.log('🔍 Checking if server is running...')
  
  const serverRunning = await checkServer()
  if (!serverRunning) {
    console.log('❌ Server is not running. Please start the development server first:')
    console.log('   npm run dev')
    process.exit(1)
  }
  
  console.log('✅ Server is running\n')
  await runAllTests()
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Integration tests interrupted')
  process.exit(0)
})

// Run the tests
main().catch(error => {
  console.error('💥 Test runner failed:', error)
  process.exit(1)
})
