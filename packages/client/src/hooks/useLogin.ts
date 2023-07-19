import { useAuth } from '@/app/context'
import { useSigninMutation } from '@/app/redux/api'
import { SigninData } from '@/shared'

export const useLogin = (): {
  handleLogin: (data: SigninData) => void
  isLoading: boolean
} => {
  const { fetchUser } = useAuth()

  const [signin, { isLoading }] = useSigninMutation()

  const handleLogin = async (data: SigninData) => {
    await signin(data)
    await fetchUser()
  }

  return { isLoading, handleLogin }
}
