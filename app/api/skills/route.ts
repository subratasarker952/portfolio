import { NextRequest, NextResponse } from 'next/server'
import dbConnect, { isMongoDBConfigured } from '@/lib/mongodb'
import Skill from '@/models/Skill'
import { sampleSkills } from '@/lib/sample-data'

export async function GET(request: NextRequest) {
  try {
    if (!isMongoDBConfigured()) {
      return NextResponse.json({ success: true, data: sampleSkills })
    }

    const db = await dbConnect()
    if (!db) {
      return NextResponse.json({ success: true, data: sampleSkills })
    }
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {}
    
    if (category && category !== 'all') {
      query.category = category
    }
    
    const skills = await Skill.find(query).sort({ category: 1, proficiency: -1 })
    
    return NextResponse.json({ success: true, data: skills })
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json({ success: true, data: sampleSkills })
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
    const skill = await Skill.create(body)
    
    return NextResponse.json({ success: true, data: skill }, { status: 201 })
  } catch (error) {
    console.error('Error creating skill:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create skill' },
      { status: 500 }
    )
  }
}
