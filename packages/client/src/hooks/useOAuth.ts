import { useGetServiceIdQuery, useOAuthSigninMutation } from '@/app/redux/api'
import { OAUTH_BASE_URL, OAUTH_REDIRECT_URL } from '@/app/redux/api/endpoints'

export const useOAuth = (): {
  handleOAuthClick: () => void
  handleOAuthSignin: (code: string) => void
  isLoading: boolean
} => {
  const { refetch } = useGetServiceIdQuery(OAUTH_REDIRECT_URL)
  const [oAuthSignin, { isLoading }] = useOAuthSigninMutation()

  const handleOAuthClick = async () => {
    const { data, isError } = await refetch()
    if (!isError && window) {
      window.location.href = `${OAUTH_BASE_URL}?response_type=code&client_id=${data?.service_id}&redirect_uri=${OAUTH_REDIRECT_URL}`
    }
  }

  const handleOAuthSignin = async (code: string) => {
    await oAuthSignin({ code: code, redirect_uri: OAUTH_REDIRECT_URL })
  }

  return { isLoading, handleOAuthClick, handleOAuthSignin }
}
