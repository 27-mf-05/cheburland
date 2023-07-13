import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@/shared'

type UserState = {
  currentUser: User | null
}
const initialState: UserState = {
  currentUser: null,
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
  },
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
