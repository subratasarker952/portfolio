import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect()
    
    const { slug } = await params
    
    // Try to find by slug first, then by ID
    let project = await Project.findOne({ slug })
    
    if (!project) {
      // Try finding by ID if slug lookup fails
      project = await Project.findById(slug).catch(() => null)
    }
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: project })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect()
    
    const { slug } = await params
    const body = await request.json()
    
    // Try updating by ID first, then by slug
    let project = await Project.findByIdAndUpdate(slug, body, {
      new: true,
      runValidators: true,
    }).catch(() => null)
    
    if (!project) {
      project = await Project.findOneAndUpdate({ slug }, body, {
        new: true,
        runValidators: true,
      })
    }
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: project })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect()
    
    const { slug } = await params
    
    // Try deleting by ID first, then by slug
    let project = await Project.findByIdAndDelete(slug).catch(() => null)
    
    if (!project) {
      project = await Project.findOneAndDelete({ slug })
    }
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: null })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
