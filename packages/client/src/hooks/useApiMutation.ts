import {
  MutateFunction,
  MutationKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useErrors } from './useErrors'

export function useApiMutation<T, V>(
  mutationKey: MutationKey,
  mutateFn: MutateFunction<T, unknown, V, unknown>,
  options?: UseMutationOptions<T, unknown, V>
): UseMutationResult<T, AxiosError<unknown>, V> {
  const { handleErrors } = useErrors()

  return useMutation<T, AxiosError, V, unknown>(mutationKey, mutateFn, {
    ...options,
    onError: e => {
      handleErrors(e)
    },
  })
}
