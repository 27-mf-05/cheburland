import { createSlice } from '@reduxjs/toolkit'

import { NotificationStatus } from '@/shared/types/notification'

type NotificationState = {
  notificationStatus: string | undefined
}

const initialState: NotificationState = {
  notificationStatus: NotificationStatus.GRANTED,
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationStatus(state, action) {
      state.notificationStatus = action.payload
    },
  },
})

export const notificationReducer = notificationSlice.reducer

export const notificationActions = notificationSlice.actions
