import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getTokenFromHeader } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = getTokenFromHeader(authHeader)
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      )
    }
    
    const payload = verifyToken(token)
    
    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }
    
    return NextResponse.json({ success: true, data: { valid: true, user: payload } })
  } catch (error) {
    console.error('Error verifying token:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to verify token' },
      { status: 500 }
    )
  }
}
