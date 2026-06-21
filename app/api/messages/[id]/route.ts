import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Message from '@/models/Message'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect()
    
    const { id } = await params
    const body = await request.json()
    
    const message = await Message.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })
    
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: message })
  } catch (error) {
    console.error('Error updating message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect()
    
    const { id } = await params
    
    const message = await Message.findByIdAndDelete(id)
    
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: null })
  } catch (error) {
    console.error('Error deleting message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    )
  }
}
