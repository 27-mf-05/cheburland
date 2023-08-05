import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  API_BASE_URL,
  LEADERBOARD_ALL_PATH,
  LEADERBOARD_PATH,
} from '@/app/redux/api/endpoints'
import { AllLeaderboardData, LeaderData } from '@/shared'

export const leaderboardApi = createApi({
  reducerPath: 'leaderboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders(headers) {
      return headers
    },
    credentials: 'include',
  }),
  endpoints: build => ({
    addUserToLeaderboard: build.mutation<void, LeaderData>({
      query: body => ({
        url: LEADERBOARD_PATH,
        method: 'POST',
        body,
      }),
    }),
    allLeaderboard: build.mutation<void, AllLeaderboardData>({
      query: body => ({
        url: LEADERBOARD_ALL_PATH,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useAddUserToLeaderboardMutation, useAllLeaderboardMutation } =
  leaderboardApi
