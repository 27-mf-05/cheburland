import { useCallback, useContext } from 'react'

import AuthService from '@/app/api/services/auth.service'
import { AuthContext } from '@/app/context/AuthContextProvider'
import { useApiMutation } from '@/hooks/useApiMutation'
import { SigninData } from '@/shared'

export const useLogin = (): {
  handleLogin: (data: SigninData) => void
  isLoading: boolean
} => {
  const { fetchUser } = useContext(AuthContext)

  const { mutate: signin, isLoading } = useApiMutation(
    ['signin'],
    (data: SigninData) => AuthService.signin(data),
    {
      onSuccess: fetchUser,
    }
  )

  const handleLogin = useCallback(
    (data: SigninData) => {
      signin(data)
    },
    [signin]
  )

  return { isLoading, handleLogin }
}
