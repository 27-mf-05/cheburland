import type { AxiosError, AxiosResponse } from 'axios'

export const DEFAULT_ERROR_MESSAGE = 'Something went wrong!'
export const WRONG_LOGIN_PASSWORD_MESSAGE = 'Неверный логин или пароль'

export const getMessage = (e: AxiosError | string): string => {
  if (typeof e === 'string') {
    return e
  }
  return (
    (e.response as AxiosResponse)?.data?.message ||
    e.message ||
    DEFAULT_ERROR_MESSAGE
  )
}
