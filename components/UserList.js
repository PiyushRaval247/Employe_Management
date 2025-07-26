'use client'

import { useDispatch } from 'react-redux'
import { setSelectedUser, deleteUser } from '../lib/features/userSlice'

export default function UserList({ users }) {
  const dispatch = useDispatch()

  const handleEdit = (user) => {
    dispatch(setSelectedUser(user))
  }

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await dispatch(deleteUser(userId)).unwrap()
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg mb-2">No users found</div>
        <p className="text-gray-400 text-sm">Add your first user using the form on the left!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user._id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {user.name}
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Email:</span> {user.email}
                </div>
                <div>
                  <span className="font-medium">Age:</span> {user.age}
                </div>
                <div>
                  <span className="font-medium">City:</span> {user.city}
                </div>
                <div>
                  <span className="font-medium">Occupation:</span> {user.occupation}
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Created: {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => handleEdit(user)}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 