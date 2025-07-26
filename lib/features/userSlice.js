import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunks for API calls
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async () => {
    const response = await fetch('/api/users')
    return response.json()
  }
)

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    return response.json()
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, userData }) => {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    return response.json()
  }
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id) => {
    await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    })
    return id
  }
)

const initialState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Create user
      .addCase(createUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false
        state.users.push(action.payload)
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        const index = state.users.findIndex(user => user._id === action.payload._id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = state.users.filter(user => user._id !== action.payload)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { setSelectedUser, clearSelectedUser } = userSlice.actions
export default userSlice.reducer 