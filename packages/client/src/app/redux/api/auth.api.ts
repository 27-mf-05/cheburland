import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  API_BASE_URL,
  AUTH_LOGOUT_PATH,
  AUTH_SIGNIN_PATH,
  AUTH_SIGNUP_PATH,
  AUTH_USER_PATH,
} from '@/app/redux/api/endpoints'
import { SigninData, SignupData, User } from '@/shared'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { extra }) => {
      if (extra) {
        headers.set('cookie', extra as string)
      }

      return headers
    },
    credentials: 'include',
  }),
  endpoints: build => ({
    signin: build.mutation<void, SigninData>({
      query: (body: SigninData) => ({
        url: AUTH_SIGNIN_PATH,
        method: 'POST',
        body,
        responseHandler: 'text',
      }),
    }),
    signup: build.mutation<{ id: number }, SignupData>({
      query: (body: SignupData) => ({
        url: AUTH_SIGNUP_PATH,
        method: 'POST',
        body,
        responseHandler: 'text',
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: AUTH_LOGOUT_PATH,
        method: 'POST',
        responseHandler: 'text',
      }),
    }),
    getCurrentUser: build.query<User, void>({
      query: () => ({
        url: AUTH_USER_PATH,
      }),
    }),
  }),
})

export const {
  useSigninMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi
