import { FormEvent, FormEventHandler } from 'react'

import { useUpdateAvatarMutation } from '@/app/redux/api'

export const useAvatar = (): {
  isLoading: boolean
  isError: boolean
  handleChange: FormEventHandler<HTMLFormElement>
} => {
  const [avatar, { isLoading, isError }] = useUpdateAvatarMutation()

  const handleChange = (event: FormEvent) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('avatar', file as Blob)

      avatar(formData)
    }
  }

  return {
    isLoading,
    isError,
    handleChange,
  }
}
