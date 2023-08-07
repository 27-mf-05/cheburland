import { FormEvent, FormEventHandler } from 'react'

import { modals } from '@mantine/modals'

import { useAuth } from '@/app/context'
import { useUpdateAvatarMutation } from '@/app/redux/api'

export const useAvatar = (): {
  isLoading: boolean
  isError: boolean
  handleChange: FormEventHandler<HTMLFormElement>
} => {
  const [avatar, { isLoading, isError }] = useUpdateAvatarMutation()
  const { fetchUser } = useAuth()

  const handleChange = async (event: FormEvent) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('avatar', file as Blob)

      await avatar(formData)
      await fetchUser()
      modals.closeAll()
    }
  }

  return {
    isLoading,
    isError,
    handleChange,
  }
}
