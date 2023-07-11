import { useCallback } from 'react'
import { toast } from 'react-toastify'

import { AxiosError } from 'axios'

import { getMessage } from '@/shared'

export const useErrors = (): {
  handleErrors: (error: AxiosError) => void
} => {
  const handleErrors = useCallback((error: AxiosError) => {
    toast.error(getMessage(error))
  }, [])

  return {
    handleErrors,
  }
}
