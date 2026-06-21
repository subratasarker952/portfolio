import { NextRequest, NextResponse } from 'next/server'
import dbConnect, { isMongoDBConfigured } from '@/lib/mongodb'
import Experience from '@/models/Experience'
import { sampleExperience } from '@/lib/sample-data'

export async function GET() {
  try {
    if (!isMongoDBConfigured()) {
      return NextResponse.json({ success: true, data: sampleExperience })
    }

    const db = await dbConnect()
    if (!db) {
      return NextResponse.json({ success: true, data: sampleExperience })
    }
    
    const experiences = await Experience.find().sort({ startDate: -1 })
    
    return NextResponse.json({ success: true, data: experiences })
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return NextResponse.json({ success: true, data: sampleExperience })
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
    const experience = await Experience.create(body)
    
    return NextResponse.json({ success: true, data: experience }, { status: 201 })
  } catch (error) {
    console.error('Error creating experience:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create experience' },
      { status: 500 }
    )
  }
}
