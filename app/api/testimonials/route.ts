import { NextRequest, NextResponse } from 'next/server'
import dbConnect, { isMongoDBConfigured } from '@/lib/mongodb'
import Testimonial from '@/models/Testimonial'
import { sampleTestimonials } from '@/lib/sample-data'

export async function GET() {
  try {
    if (!isMongoDBConfigured()) {
      return NextResponse.json({ success: true, data: sampleTestimonials })
    }

    const db = await dbConnect()
    if (!db) {
      return NextResponse.json({ success: true, data: sampleTestimonials })
    }
    
    const testimonials = await Testimonial.find().sort({ createdAt: -1 })
    
    return NextResponse.json({ success: true, data: testimonials })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ success: true, data: sampleTestimonials })
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
    const testimonial = await Testimonial.create(body)
    
    return NextResponse.json({ success: true, data: testimonial }, { status: 201 })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}
