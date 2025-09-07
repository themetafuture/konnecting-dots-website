import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '../../../../backend/services/blogService'

const blogService = new BlogService()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())
    
    // Check if this is a request for published posts (public)
    const isPublic = !request.headers.get('authorization') && !request.cookies.get('auth-token')
    
    const result = isPublic 
      ? await blogService.getPublishedBlogPosts(query)
      : await blogService.getBlogPosts(query)
    
    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error: any) {
    console.error('Blog posts fetch error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch blog posts'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Extract token from cookie or header
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 })
    }
    
    // TODO: Verify user has permission to create blog posts
    // For now, we'll use a placeholder author ID
    const body = await request.json()
    const blogPost = await blogService.createBlogPost(body, 'placeholder-author-id')
    
    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      data: blogPost
    }, { status: 201 })
  } catch (error: any) {
    console.error('Blog post creation error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to create blog post'
    }, { status: 500 })
  }
}
