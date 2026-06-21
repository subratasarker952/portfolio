import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Skill from '@/models/Skill'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect()
    
    const { id } = await params
    const body = await request.json()
    
    const skill = await Skill.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })
    
    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Skill not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: skill })
  } catch (error) {
    console.error('Error updating skill:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update skill' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect()
    
    const { id } = await params
    
    const skill = await Skill.findByIdAndDelete(id)
    
    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Skill not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: null })
  } catch (error) {
    console.error('Error deleting skill:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete skill' },
      { status: 500 }
    )
  }
}
