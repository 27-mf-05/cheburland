import {
  useSearchUserMutation,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} from '@/app/redux/api'
import { Password, Profile } from '@/shared'

export const useProfile = (): {
  isLoading: boolean
  profile: (data: Profile) => void
  search: (data: { login: string }) => void
  handleSubmitPassword: (data: Password) => void
} => {
  const [profile, { isLoading: isLoadingProfile }] = useUpdateProfileMutation()

  const [password, { isLoading: isLoadingPassword }] =
    useUpdatePasswordMutation()

  const [search, { isLoading: isLoadingSearch }] = useSearchUserMutation()

  const handleSubmitPassword = (values: Password) => password(values)

  return {
    isLoading: isLoadingProfile || isLoadingPassword || isLoadingSearch,
    profile,
    search,
    handleSubmitPassword,
  }
}
