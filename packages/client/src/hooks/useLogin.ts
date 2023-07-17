import { useCallback } from 'react'

import AuthService from '@/app/api/services/auth.service'
import { useAuth } from '@/app/context'
import { useApiMutation } from '@/hooks/useApiMutation'
import { SigninData } from '@/shared'

export const useLogin = (): {
  handleLogin: (data: SigninData) => void
  isLoading: boolean
} => {
  const { login } = useAuth()

  const { mutate: signin, isLoading } = useApiMutation(
    ['signin'],
    (data: SigninData) => AuthService.signin(data),
    {
      onSuccess: login,
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
