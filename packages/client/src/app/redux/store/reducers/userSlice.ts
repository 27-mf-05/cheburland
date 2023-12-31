import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@/shared'

type UserState = {
  currentUser: User | null
  fromOAuth: boolean
}
const initialState: UserState = {
  currentUser: null,
  fromOAuth: false,
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

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
