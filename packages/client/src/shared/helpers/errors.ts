export const DEFAULT_ERROR_MESSAGE = 'Something went wrong!'

export const getMessage = (e: Error): string => {
  return e.message || DEFAULT_ERROR_MESSAGE
}
