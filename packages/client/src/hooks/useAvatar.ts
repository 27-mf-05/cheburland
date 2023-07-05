import { FormEvent, FormEventHandler, useCallback } from 'react'

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

  const handleChange = useCallback(
    (event: FormEvent) => {
      const input = event.target as HTMLInputElement
      const file = input.files?.[0]
      if (file) {
        const formData = new FormData()
        formData.append('avatar', file as Blob)

        avatar(formData)
      }
    },
    [avatar]
  )

  return {
    isLoading,
    isError,
    handleChange,
  }
}
