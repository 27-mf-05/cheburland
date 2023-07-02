import { useCallback } from 'react'

import { AxiosError } from 'axios'

import { getMessage } from '@/shared'

export const useErrors = (): {
  handleErrors: (error: AxiosError) => void
} => {
  const handleErrors = useCallback((error: AxiosError) => {
    console.error(getMessage(error))
  }, [])

  return {
    handleErrors,
  }
}
