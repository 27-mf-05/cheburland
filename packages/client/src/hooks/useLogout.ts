import { useCallback } from 'react'

import AuthService from '@/app/api/services/auth.service'
import { useAuth } from '@/app/context'

import { useApiMutation } from './useApiMutation'

export const useLogout = (): {
  handleLogout: () => void
} => {
  const { logout: authLogout } = useAuth()
  const { mutate: logout } = useApiMutation(
    ['logout'],
    () => AuthService.logout(),
    {
      onSuccess: authLogout,
    }
  )

  const handleLogout = useCallback(() => {
    logout({})
  }, [logout])

  return { handleLogout }
}
