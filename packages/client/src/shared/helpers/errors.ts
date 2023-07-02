import { AxiosError, AxiosResponse } from 'axios'

export const DEFAULT_ERROR_MESSAGE = 'Something went wrong!'

export const getMessage = (e: AxiosError): string =>
  (e.response as AxiosResponse)?.data?.message ||
  e.message ||
  DEFAULT_ERROR_MESSAGE
