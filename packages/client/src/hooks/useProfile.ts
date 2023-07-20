import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

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
} => {
  const [profile, { isLoading: isLoadingProfile }] = useUpdateProfileMutation()

  const [password, { isLoading: isLoadingPassword }] =
    useUpdatePasswordMutation()

  const [search, { isLoading: isLoadingSearch }] = useSearchUserMutation()

  const navigate = useNavigate()
  const { paths } = useRoutes()

  const handleSubmitPassword = (values: Password) => {
    password(values)
      .unwrap()
      //бекенд всегда возвращает ошибку из-за строки в ответе вместо json, поэтому обрабатываем успех в catch
      .catch(e => {
        if (e.data === 'OK') {
          navigate(paths.Profile)
          toast.success('Password has been successfully changed')
        }
      })
  }

  return {
    isLoading: isLoadingProfile || isLoadingPassword || isLoadingSearch,
    profile,
    search,
    handleSubmitPassword,
  }
}
