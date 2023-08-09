import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuth } from '@/app/context'
import {
  useSearchUserMutation,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} from '@/app/redux/api'
import { useRoutes } from '@/hooks/useRoutes'
import { Password, Profile } from '@/shared'

export const useProfile = (): {
  isLoading: boolean
  profile: (data: Profile) => void
  search: (data: { login: string }) => void
  handleSubmitPassword: (data: Password) => void
  handleSubmitProfile: (data: Profile) => void
} => {
  const [profile, { isLoading: isLoadingProfile }] = useUpdateProfileMutation()

  const [password, { isLoading: isLoadingPassword }] =
    useUpdatePasswordMutation()

  const [search, { isLoading: isLoadingSearch }] = useSearchUserMutation()

  const navigate = useNavigate()
  const { paths } = useRoutes()
  const { fetchUser } = useAuth()

  const handleSubmitPassword = useCallback(
    (values: Password) => {
      password(values)
        .unwrap()
        .then(() => {
          navigate(paths.Profile)
          toast.success('Password has been successfully changed')
        })
    },
    [password, navigate, paths]
  )

  const handleSubmitProfile = useCallback(
    (values: Profile) => {
      profile(values)
        .unwrap()
        .then(() => {
          fetchUser()
          navigate(paths.Profile)
          toast.success('Profile has been successfully changed')
        })
    },
    [profile, fetchUser, navigate, paths]
  )

  return {
    isLoading: isLoadingProfile || isLoadingPassword || isLoadingSearch,
    profile,
    search,
    handleSubmitPassword,
    handleSubmitProfile,
  }
}
