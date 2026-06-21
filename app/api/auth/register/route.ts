import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/models/Admin'
import { signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { email, password, name } = await request.json()
    
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email })

    
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: 'Admin already exists with this email' },
        { status: 400 }
      )
    }
    
    // Create new admin
    const admin = await Admin.create({ email, password, name })
    
    // Generate token
    const token = signToken({ userId: admin._id.toString(), email: admin.email })
    
    return NextResponse.json({ success: true, data: { token } }, { status: 201 })
  } catch (error) {
    console.error('Error registering:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to register' },
      { status: 500 }
    )
  }
}
