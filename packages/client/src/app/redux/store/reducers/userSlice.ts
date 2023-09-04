import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@/shared'

export type UserState = {
  currentUser: User | null
  fromOAuth: boolean
  isLoaded: boolean
  isLoading: boolean
}
const initialState: UserState = {
  currentUser: null,
  fromOAuth: false,
  isLoaded: false,
  isLoading: false,
}

interface UserService {
  getCurrentUser(): Promise<User>
}

export const loadUser = createAsyncThunk<User>(
  'root/AuthUser',
  async (_, thunkApi) => {
    const service: UserService = thunkApi.extra as UserService
    return service.getCurrentUser()
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload
    },
    deleteUser(state) {
      state.currentUser = null
    },
    setFromOAuth(state) {
      state.fromOAuth = true
    },
    clearFromOAuth(state) {
      state.fromOAuth = false
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUser.pending, state => {
      state.isLoaded = false
      state.isLoading = true
    })
    builder.addCase(loadUser.rejected, state => {
      state.isLoaded = true
      state.currentUser = null
      state.isLoading = false
    })
    builder.addCase(loadUser.fulfilled, (state, action) => {
      const { payload } = action
      state.currentUser = payload
      state.isLoaded = true
      state.isLoading = false
    })
  },
})

const { actions, reducer: userReducer } = userSlice
export const { addUser, deleteUser } = actions
export default userReducer
