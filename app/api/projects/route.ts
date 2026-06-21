import { NextRequest, NextResponse } from 'next/server'
import dbConnect, { isMongoDBConfigured } from '@/lib/mongodb'
import Project from '@/models/Project'
import { sampleProjects } from '@/lib/sample-data'

export async function GET(request: NextRequest) {
  try {
    // If MongoDB is not configured, return sample data
    if (!isMongoDBConfigured()) {
      return NextResponse.json({ success: true, data: sampleProjects })
    }

    const db = await dbConnect()
    
    // If connection failed, return sample data
    if (!db) {
      return NextResponse.json({ success: true, data: sampleProjects })
    }
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {}
    
    if (category && category !== 'all') {
      query.category = category
    }
    
    if (featured === 'true') {
      query.featured = true
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { techStack: { $in: [new RegExp(search, 'i')] } },
      ]
    }
    
    const projects = await Project.find(query).sort({ createdAt: -1 })
    
    return NextResponse.json({ success: true, data: projects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    // Return sample data on error
    return NextResponse.json({ success: true, data: sampleProjects })
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isMongoDBConfigured()) {
      return NextResponse.json(
        { success: false, error: 'MongoDB not configured. Please add MONGODB_URI environment variable.' },
        { status: 503 }
      )
    }

    const db = await dbConnect()
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database connection failed' },
        { status: 503 }
      )
    }
    
    const body = await request.json()
    
    // Generate slug from title if not provided
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }
    
    const project = await Project.create(body)
    
    return NextResponse.json({ success: true, data: project }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
