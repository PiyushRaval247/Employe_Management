'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, updateUser, clearSelectedUser } from '../lib/features/userSlice'

export default function UserForm() {
  const dispatch = useDispatch()
  const { selectedUser, loading } = useSelector((state) => state.user)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    city: '',
    occupation: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name || '',
        email: selectedUser.email || '',
        age: selectedUser.age || '',
        city: selectedUser.city || '',
        occupation: selectedUser.occupation || ''
      })
    } else {
      setFormData({
        name: '',
        email: '',
        age: '',
        city: '',
        occupation: ''
      })
    }
    setErrors({})
  }, [selectedUser])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.age) {
      newErrors.age = 'Age is required'
    } else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Age must be between 1 and 120'
    }
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      if (selectedUser) {
        await dispatch(updateUser({ id: selectedUser._id, userData: formData })).unwrap()
        dispatch(clearSelectedUser())
      } else {
        await dispatch(createUser(formData)).unwrap()
      }
      
      setFormData({
        name: '',
        email: '',
        age: '',
        city: '',
        occupation: ''
      })
      setErrors({})
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const handleCancel = () => {
    dispatch(clearSelectedUser())
    setFormData({
      name: '',
      email: '',
      age: '',
      city: '',
      occupation: ''
    })
    setErrors({})
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter full name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter email address"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
          Age *
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          min="1"
          max="120"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.age ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter age"
        />
        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
          City *
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.city ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter city"
        />
        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
      </div>

      <div>
        <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
          Occupation *
        </label>
        <input
          type="text"
          id="occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.occupation ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter occupation"
        />
        {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : selectedUser ? 'Update User' : 'Add User'}
        </button>
        {selectedUser && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
} 