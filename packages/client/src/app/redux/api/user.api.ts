import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  API_BASE_URL,
  USER_AVATAR_PATH,
  USER_PASSWORD_PATH,
  USER_PATH,
  USER_PROFILE_PATH,
  USER_SEARCH_PATH,
} from '@/app/redux/api/endpoints'
import { Password, Profile, User } from '@/shared'

const uploadFileHeaders = {
  'Content-Type': 'multipart/form-data',
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders(headers) {
      return headers
    },
    credentials: 'include',
  }),
  endpoints: build => ({
    getUserById: build.query<User, number>({
      query: (id: number) => ({
        url: `${USER_PATH}/${id}`,
      }),
    }),
    updateProfile: build.mutation<User, Profile>({
      query: (body: Profile) => ({
        url: USER_PROFILE_PATH,
        method: 'PUT',
        body,
      }),
    }),
    updatePassword: build.mutation<void, Password>({
      query: (body: Password) => {
        return {
          url: USER_PASSWORD_PATH,
          method: 'PUT',
          body,
          responseHandler: 'text',
        }
      },
    }),
    updateAvatar: build.mutation<void, FormData>({
      query: (body: FormData) => ({
        url: USER_AVATAR_PATH,
        method: 'PUT',
        body,
        headers: uploadFileHeaders,
      }),
    }),
    searchUser: build.mutation<User, { login: string }>({
      query: (body: { login: string }) => ({
        url: USER_SEARCH_PATH,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetUserByIdQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useUpdateAvatarMutation,
  useSearchUserMutation,
} = userApi
