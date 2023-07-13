import { useCallback, useContext } from 'react'

import AuthService from '@/app/api/services/auth.service'
import { AuthContext } from '@/app/context/AuthContextProvider'
import { useApiMutation } from '@/hooks/useApiMutation'
import { SignupData } from '@/shared'

export const useRegistration = (): {
  handleRegistration: (data: SignupData) => void
  isLoading: boolean
} => {
  const { fetchUser } = useContext(AuthContext)

  const { mutate: signup, isLoading } = useApiMutation(
    ['signup'],
    (data: SignupData) => AuthService.signup(data),
    {
      onSuccess: fetchUser,
    }
  )

  const handleRegistration = useCallback(
    (data: SignupData) => {
      signup(data)
    },
    [signup]
  )

  return { isLoading, handleRegistration }
}
