import { FormEvent, FormEventHandler } from 'react'

import { UserService } from '@/app/api'
import { useApiMutation } from '@/hooks'

export const useAvatar = ({
  onSuccess,
}: {
  onSuccess?: () => void
}): {
  isLoading: boolean
  isError: boolean
  handleChange: FormEventHandler<HTMLFormElement>
} => {
  const {
    mutate: avatar,
    isLoading,
    isError,
  } = useApiMutation(['avatar'], (data: FormData) => UserService.avatar(data), {
    onSuccess,
  })

  const handleChange = (event: FormEvent) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    const formData = new FormData()
    formData.append('avatar', file as Blob)

    avatar(formData)
  }

  return {
    isLoading,
    isError,
    handleChange,
  }
}
