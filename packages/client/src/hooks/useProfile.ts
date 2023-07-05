import { useCallback } from 'react'

import { UserService } from '@/app/api'
import { useApiMutation } from '@/hooks'
import { Password, Profile } from '@/shared'

export const useProfile = ({
  onSuccess,
}: {
  onSuccess?: () => void
}): {
  isLoading: boolean
  profile: (data: Profile) => void
  search: (data: { login: string }) => void
  handleSubmitPassword: (data: Password) => void
} => {
  const { mutate: profile, isLoading: isLoadingProfile } = useApiMutation(
    ['profile'],
    (data: Profile) => UserService.profile(data),
    {
      onSuccess,
    }
  )
  const { mutate: password, isLoading: isLoadingPassword } = useApiMutation(
    ['password'],
    (data: Password) => UserService.password(data),
    {
      onSuccess,
    }
  )

  const { mutate: search, isLoading: isLoadingSearch } = useApiMutation(
    ['search'],
    (data: { login: string }) => UserService.search(data),
    {
      onSuccess,
    }
  )

  const handleSubmitPassword = useCallback(
    (values: Password) => password(values),
    [password]
  )

  return {
    isLoading: isLoadingProfile || isLoadingPassword || isLoadingSearch,
    profile,
    search,
    handleSubmitPassword,
  }
}
