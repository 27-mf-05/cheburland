import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  API_BASE_URL,
  OAUTH_SERVICE_ID_PATH,
  OAUTH_SIGNIN_PATH,
} from '@/app/redux/api/endpoints'
import { OAuthSigninData } from '@/shared'

export const oAuthApi = createApi({
  reducerPath: 'oAuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders(headers) {
      return headers
    },
    credentials: 'include',
  }),
  endpoints: build => ({
    oAuthSignin: build.mutation<void, OAuthSigninData>({
      query: body => ({
        url: OAUTH_SIGNIN_PATH,
        method: 'POST',
        body,
        responseHandler: 'text',
      }),
    }),
    getServiceId: build.query<{ service_id: string }, string>({
      query: redirect_url => ({
        url: OAUTH_SERVICE_ID_PATH,
        params: {
          redirect_url,
        },
      }),
    }),
  }),
})

export const { useOAuthSigninMutation, useGetServiceIdQuery } = oAuthApi
