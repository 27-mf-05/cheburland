import { UserService } from '@/app/api'
import { useApiMutation, useApiQuery } from '@/hooks'
import { Profile, User } from '@/shared'

export const useProfile = ({
  id,
  onSuccess,
}: {
  id: number
  onSuccess?: () => void
}): {
  user?: User
  isLoading: boolean
  isError: boolean
  profile: (data: Profile) => void
  search: (data: { login: string }) => void
  password: (data: { oldPassword: string; newPassword: string }) => void
} => {
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useApiQuery(['user'], () => UserService.get({ id }))

  const { mutate: profile, isLoading: isLoadingProfile } = useApiMutation(
    ['profile'],
    (data: Profile) => UserService.profile(data),
    {
      onSuccess,
    }
  )
  const { mutate: password, isLoading: isLoadingPassword } = useApiMutation(
    ['password'],
    (data: { oldPassword: string; newPassword: string }) =>
      UserService.password(data),
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

  return {
    user,
    isLoading:
      isLoadingProfile || isLoadingUser || isLoadingPassword || isLoadingSearch,
    isError: isErrorUser,
    profile,
    password,
    search,
  }
}