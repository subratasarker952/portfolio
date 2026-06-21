import { NextRequest, NextResponse } from 'next/server'
import dbConnect, { isMongoDBConfigured } from '@/lib/mongodb'
import About from '@/models/About'
import { sampleAbout } from '@/lib/sample-data'

export async function GET() {
  try {
    if (!isMongoDBConfigured()) {
      return NextResponse.json({ success: true, data: sampleAbout })
    }

    const db = await dbConnect()
    if (!db) {
      return NextResponse.json({ success: true, data: sampleAbout })
    }
    
    // Get the first (and ideally only) about document
    const about = await About.findOne()
    
    return NextResponse.json({ success: true, data: about || sampleAbout })
  } catch (error) {
    console.error('Error fetching about:', error)
    return NextResponse.json({ success: true, data: sampleAbout })
  }
}

export async function PUT(request: NextRequest) {
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
    
    // Update existing or create new
    const about = await About.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true, runValidators: true }
    )
    
    return NextResponse.json({ success: true, data: about })
  } catch (error) {
    console.error('Error updating about:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update about' },
      { status: 500 }
    )
  }
}
