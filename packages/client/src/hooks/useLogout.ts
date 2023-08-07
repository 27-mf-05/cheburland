import { useAuth } from '@/app/context'
import { useLogoutMutation } from '@/app/redux/api'
import { userSlice } from '@/app/redux/store/reducers'
import { useAppDispatch } from '@/hooks/useAppDispatch'

export const useLogout = (): {
  handleLogout: () => void
  isLoading: boolean
} => {
  const { fetchUser } = useAuth()

  const dispatch = useAppDispatch()
  const { clearFromOAuth } = userSlice.actions

  const [logout, { isLoading }] = useLogoutMutation()

  const handleLogout = async () => {
    await logout()
    await fetchUser()
    dispatch(clearFromOAuth())
  }

  return { isLoading, handleLogout }
}
