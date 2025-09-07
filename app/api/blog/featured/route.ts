import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '../../../../backend/services/blogService'

const blogService = new BlogService()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '5')
    
    const posts = await blogService.getFeaturedPosts(limit)
    
    return NextResponse.json({
      success: true,
      data: posts
    })
  } catch (error: any) {
    console.error('Featured posts fetch error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch featured posts'
    }, { status: 500 })
  }
}
