import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [1, 'Age must be at least 1'],
    max: [120, 'Age cannot exceed 120'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
    trim: true,
  },
}, {
  timestamps: true,
  
})

// Prevent mongoose from creating the model multiple times
export default mongoose.models.User || mongoose.model('User', userSchema) 