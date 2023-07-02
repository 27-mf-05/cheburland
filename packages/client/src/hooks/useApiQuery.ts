import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useErrors } from './useErrors'

export function useApiQuery<T>(
  queryKey: QueryKey,
  queryFn: QueryFunction<T>,
  options?: UseQueryOptions<T, AxiosError>
): UseQueryResult<T, AxiosError> {
  const { handleErrors } = useErrors()

  return useQuery<T, AxiosError, T>(queryKey, queryFn, {
    ...options,
    onError: e => {
      handleErrors(e)
    },
  })
}
