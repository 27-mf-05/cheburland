import { useCallback, useContext } from 'react'

import AuthService from '@/app/api/services/auth.service'
import { AuthContext } from '@/app/context/auth-provider'

export const useLogout = (): {
  handleLogout: () => void
} => {
  const { fetchUser } = useContext(AuthContext)

  const handleLogout = useCallback(async () => {
    await AuthService.logout()
    fetchUser()
  }, [fetchUser])

  return { handleLogout }
}
