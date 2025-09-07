import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '../../../../backend/services/blogService'

const blogService = new BlogService()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const posts = await blogService.getRecentPosts(limit)
    
    return NextResponse.json({
      success: true,
      data: posts
    })
  } catch (error: any) {
    console.error('Recent posts fetch error:', error)
    
    if (error.statusCode) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch recent posts'
    }, { status: 500 })
  }
}
