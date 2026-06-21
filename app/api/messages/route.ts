import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Message from '@/models/Message'

export async function GET() {
  try {
    await dbConnect()
    
    const messages = await Message.find().sort({ createdAt: -1 })
    
    return NextResponse.json({ success: true, data: messages })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    
    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }
    
    const message = await Message.create(body)
    
    return NextResponse.json({ success: true, data: message }, { status: 201 })
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
