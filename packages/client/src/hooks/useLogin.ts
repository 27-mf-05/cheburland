import { useCallback } from 'react'

import { useAuth } from '@/app/context'
import { useSigninMutation } from '@/app/redux/api'
import { SigninData } from '@/shared'

export const useLogin = (): {
  handleLogin: (data: SigninData) => void
  isLoading: boolean
} => {
  const { fetchUser } = useAuth()

  const [signin, { isLoading }] = useSigninMutation()

  const handleLogin = useCallback(
    async (data: SigninData) => {
      await signin(data)
      await fetchUser()
    },
    [fetchUser, signin]
  )

  return { isLoading, handleLogin }
}
