'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../lib/features/userSlice'
import UserForm from '../components/UserForm'
import UserList from '../components/UserList'
import Header from '../components/Header'

export default function Home() {
  const dispatch = useDispatch()
  const { users, loading, error } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New User</h2>
            <UserForm />
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">User List</h2>
            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            {!loading && !error && <UserList users={users} />}
          </div>
        </div>
      </div>
    </div>
  )
} 