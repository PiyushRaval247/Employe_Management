import { NextResponse } from 'next/server'
import connectDB from '../../../lib/mongodb'
import User from '../../../models/User'

// GET /api/users - Get all users
export async function GET() {
  try {
    await connectDB()
    const users = await User.find({}).sort({ createdAt: -1 })
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST /api/users - Create a new user
export async function POST(request) {
  try {
    await connectDB()
    const body = await request.json()
    
    // Validate required fields
    const { name, email, age, city, occupation } = body
    if (!name || !email || !age || !city || !occupation) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if user with email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    const user = await User.create(body)
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
} 