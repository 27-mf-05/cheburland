import { useCallback } from 'react'

import { useGetServiceIdQuery, useOAuthSigninMutation } from '@/app/redux/api'
import { OAUTH_BASE_URL, OAUTH_REDIRECT_URL } from '@/app/redux/api/endpoints'
import { userSlice } from '@/app/redux/store/reducers'
import { useAppDispatch } from '@/hooks/useAppDispatch'

export const useOAuth = (): {
  handleOAuthClick: () => void
  handleOAuthSignin: (code: string) => void
  isLoading: boolean
} => {
  const { refetch } = useGetServiceIdQuery(OAUTH_REDIRECT_URL)
  const [oAuthSignin, { isLoading }] = useOAuthSigninMutation()

  const dispatch = useAppDispatch()
  const { setFromOAuth } = userSlice.actions

  const handleOAuthClick = useCallback(async () => {
    const { data, isError } = await refetch()
    if (!isError && window) {
      window.location.href = `${OAUTH_BASE_URL}?response_type=code&client_id=${data?.service_id}&redirect_uri=${OAUTH_REDIRECT_URL}`
    }
  }, [refetch])

  const handleOAuthSignin = useCallback(
    async (code: string) => {
      await oAuthSignin({ code: code, redirect_uri: OAUTH_REDIRECT_URL })
      dispatch(setFromOAuth())
    },
    [oAuthSignin, dispatch, setFromOAuth]
  )

  return { isLoading, handleOAuthClick, handleOAuthSignin }
}
