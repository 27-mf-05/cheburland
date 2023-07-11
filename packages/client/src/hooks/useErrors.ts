import { useCallback } from 'react'
import { toast } from 'react-toastify'

import { AxiosError } from 'axios'

import { getMessage } from '@/shared'

export const useErrors = (): {
  handleErrors: (error: AxiosError | string) => void
} => {
  const handleErrors = useCallback((error: AxiosError | string) => {
    toast.error(getMessage(error))
  }, [])

  return {
    handleErrors,
  }
}
