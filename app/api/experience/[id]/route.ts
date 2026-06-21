import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Experience from '@/models/Experience'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect()
    
    const { id } = await params
    const body = await request.json()
    
    const experience = await Experience.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })
    
    if (!experience) {
      return NextResponse.json(
        { success: false, error: 'Experience not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: experience })
  } catch (error) {
    console.error('Error updating experience:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update experience' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect()
    
    const { id } = await params
    
    const experience = await Experience.findByIdAndDelete(id)
    
    if (!experience) {
      return NextResponse.json(
        { success: false, error: 'Experience not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: null })
  } catch (error) {
    console.error('Error deleting experience:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete experience' },
      { status: 500 }
    )
  }
}
