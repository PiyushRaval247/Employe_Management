import { NextResponse } from 'next/server'
import connectDB from '../../../../lib/mongodb'
import User from '../../../../models/User'

// PUT /api/users/[id] - Update a user
export async function PUT(request, { params }) {
  try {
    await connectDB()
    const { id } = params
    const body = await request.json()
    
    // Validate required fields
    const { name, email, age, city, occupation } = body
    if (!name || !email || !age || !city || !occupation) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await User.findById(id)
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if email is already taken by another user
    const emailExists = await User.findOne({ email, _id: { $ne: id } })
    if (emailExists) {
      return NextResponse.json(
        { error: 'Email is already taken by another user' },
        { status: 400 }
      )
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    )
    
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

// DELETE /api/users/[id] - Delete a user
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const { id } = params
    
    // Check if user exists
    const existingUser = await User.findById(id)
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    await User.findByIdAndDelete(id)
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
} 