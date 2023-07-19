import { useAuth } from '@/app/context'
import { useSignupMutation } from '@/app/redux/api'
import { SignupData } from '@/shared'

export const useRegistration = (): {
  handleRegistration: (data: SignupData) => void
  isLoading: boolean
} => {
  const { fetchUser } = useAuth()

  const [signup, { isLoading }] = useSignupMutation()

  const handleRegistration = async (data: SignupData) => {
    await signup(data)
    await fetchUser()
  }

  return { isLoading, handleRegistration }
}
