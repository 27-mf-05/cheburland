import { useGetServiceIdQuery, useOAuthSigninMutation } from '@/app/redux/api'
import { RouteName, routes } from '@/app/routes'

const redirect_uri = 'http://localhost:3000'
const base_oauth_url = 'https://oauth.yandex.ru/authorize'

export const useOAuth = (): {
  handleOAuthClick: () => void
  handleOAuthSignin: (code: string) => void
  isLoading: boolean
} => {
  const { refetch } = useGetServiceIdQuery(redirect_uri)
  const [oAuthSignin, { isLoading }] = useOAuthSigninMutation()

  const handleOAuthClick = async () => {
    const { data, isError } = await refetch()
    if (!isError) {
      const url = `${base_oauth_url}?response_type=code&client_id=${data?.service_id}&redirect_uri=${redirect_uri}`
      window.location.href = url
    }
  }

  const handleOAuthSignin = async (code: string) => {
    await oAuthSignin({ code: code, redirect_uri: redirect_uri })
      .unwrap()
      .then(() => {
        window.location.href = routes[RouteName.Main].path
      })
  }

  return { isLoading, handleOAuthClick, handleOAuthSignin }
}
