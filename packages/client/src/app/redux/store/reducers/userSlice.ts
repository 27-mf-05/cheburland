import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@/shared'

type UserState = {
  currentUser: User | null
  fromOAuth: boolean
}
const initialState: UserState = {
  currentUser: null,
  fromOAuth: false,
}

interface UserService {
  getUserData(): Promise<User>
}

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
})

export const loadUser = createAsyncThunk<User>(
  'root/AuthUser',
  async (_, thunkApi) => {
    const service: UserService = thunkApi.extra as UserService
    return service.getUserData()
  }
)

const { actions, reducer: userReducer } = userSlice
export const { addUser, deleteUser } = actions
export default userReducer
