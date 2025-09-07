import { prisma } from '../config/database'
import { createError } from '../middleware/error'
import { createBlogPostSchema, updateBlogPostSchema, blogQuerySchema } from '../utils/validation'

export class BlogService {
  async createBlogPost(data: any, authorId: string) {
    const validatedData = createBlogPostSchema.parse(data)
    
    // Generate slug from title
    const slug = validatedData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Calculate read time if not provided
    const readTime = validatedData.readTime || Math.ceil(validatedData.content.split(' ').length / 200)

    const blogPost = await prisma.blogPost.create({
      data: {
        ...validatedData,
        slug,
        readTime,
        authorId,
        publishedAt: validatedData.featured ? new Date() : null,
        status: validatedData.featured ? 'PUBLISHED' : 'DRAFT'
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          }
        }
      }
    })

    return blogPost
  }

  async getBlogPosts(query: any) {
    const { page, limit, search, category, status, featured, sortBy, sortOrder } = 
      blogQuerySchema.parse(query)

    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (category) where.category = category
    if (status) where.status = status
    if (featured !== undefined) where.featured = featured

    const [blogPosts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy || 'createdAt']: sortOrder },
        include: {
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
            }
          }
        }
      }),
      prisma.blogPost.count({ where })
    ])

    return {
      blogPosts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  async getPublishedBlogPosts(query: any) {
    const { page, limit, search, category, sortBy, sortOrder } = 
      blogQuerySchema.parse(query)

    const skip = (page - 1) * limit

    const where: any = {
      status: 'PUBLISHED',
      publishedAt: {
        lte: new Date()
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (category) where.category = category

    const [blogPosts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy || 'publishedAt']: sortOrder },
        include: {
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
            }
          }
        }
      }),
      prisma.blogPost.count({ where })
    ])

    return {
      blogPosts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  async getBlogPostById(id: string) {
    const blogPost = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          }
        }
      }
    })

    if (!blogPost) {
      throw createError('Blog post not found', 404)
    }

    // Increment view count
    await prisma.blogPost.update({
      where: { id },
      data: {
        views: {
          increment: 1
        }
      }
    })

    return {
      ...blogPost,
      views: blogPost.views + 1
    }
  }

  async getBlogPostBySlug(slug: string) {
    const blogPost = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          }
        }
      }
    })

    if (!blogPost) {
      throw createError('Blog post not found', 404)
    }

    // Only increment views for published posts
    if (blogPost.status === 'PUBLISHED') {
      await prisma.blogPost.update({
        where: { slug },
        data: {
          views: {
            increment: 1
          }
        }
      })

      return {
        ...blogPost,
        views: blogPost.views + 1
      }
    }

    return blogPost
  }

  async updateBlogPost(id: string, data: any) {
    const validatedData = updateBlogPostSchema.parse(data)

    const blogPost = await prisma.blogPost.findUnique({
      where: { id }
    })

    if (!blogPost) {
      throw createError('Blog post not found', 404)
    }

    // Update slug if title changed
    let updateData = { ...validatedData }
    if (validatedData.title && validatedData.title !== blogPost.title) {
      updateData.slug = validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    // Update read time if content changed
    if (validatedData.content && !validatedData.readTime) {
      updateData.readTime = Math.ceil(validatedData.content.split(' ').length / 200)
    }

    const updatedBlogPost = await prisma.blogPost.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          }
        }
      }
    })

    return updatedBlogPost
  }

  async deleteBlogPost(id: string) {
    const blogPost = await prisma.blogPost.findUnique({
      where: { id }
    })

    if (!blogPost) {
      throw createError('Blog post not found', 404)
    }

    await prisma.blogPost.delete({
      where: { id }
    })

    return { message: 'Blog post deleted successfully' }
  }

  async publishBlogPost(id: string) {
    const blogPost = await prisma.blogPost.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date()
      }
    })

    return blogPost
  }

  async unpublishBlogPost(id: string) {
    const blogPost = await prisma.blogPost.update({
      where: { id },
      data: {
        status: 'DRAFT',
        publishedAt: null
      }
    })

    return blogPost
  }

  async getFeaturedPosts(limit: number = 5) {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
        featured: true,
        publishedAt: {
          lte: new Date()
        }
      },
      take: limit,
      orderBy: {
        publishedAt: 'desc'
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          }
        }
      }
    })

    return posts
  }

  async getRecentPosts(limit: number = 10) {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
        publishedAt: {
          lte: new Date()
        }
      },
      take: limit,
      orderBy: {
        publishedAt: 'desc'
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          }
        }
      }
    })

    return posts
  }

  async getBlogStats() {
    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      totalViews,
      featuredPosts,
      postsThisMonth,
    ] = await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.count({
        where: { status: 'PUBLISHED' }
      }),
      prisma.blogPost.count({
        where: { status: 'DRAFT' }
      }),
      prisma.blogPost.aggregate({
        _sum: {
          views: true
        }
      }),
      prisma.blogPost.count({
        where: { featured: true }
      }),
      prisma.blogPost.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      })
    ])

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalViews: totalViews._sum.views || 0,
      featuredPosts,
      postsThisMonth,
    }
  }

  async getCategories() {
    const categories = await prisma.blogPost.groupBy({
      by: ['category'],
      _count: {
        category: true
      },
      where: {
        status: 'PUBLISHED'
      }
    })

    return categories.map(cat => ({
      category: cat.category,
      count: cat._count.category
    }))
  }
}
