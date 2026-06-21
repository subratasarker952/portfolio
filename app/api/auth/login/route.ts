import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/models/Admin'
import { signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }
    
    // Find admin by email
    const admin = await Admin.findOne({ email })
    
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Check password
    const isMatch = await admin.comparePassword(password)
    
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Generate token
    const token = signToken({ userId: admin._id.toString(), email: admin.email })
    
    return NextResponse.json({ success: true, data: { token } })
  } catch (error) {
    console.error('Error logging in:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to login' },
      { status: 500 }
    )
  }
}
