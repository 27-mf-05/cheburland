import { useAuth } from '@/app/context'
import { useLogoutMutation } from '@/app/redux/api'

export const useLogout = (): {
  handleLogout: () => void
  isLoading: boolean
} => {
  const { fetchUser } = useAuth()

  const [logout, { isLoading }] = useLogoutMutation()

  const handleLogout = async () => {
    await logout()
    await fetchUser()
  }

  return { isLoading, handleLogout }
}
