import { toast } from 'react-toastify'

import type { Middleware } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'

export const errorToastMiddleware: Middleware = () => next => action => {
  if (
    isRejectedWithValue(action) &&
    //Проверка, чтобы ошибка постоянно не вылезала для неавторизованных пользоватлей.
    action.payload.data.reason !== 'Cookie is not valid'
  ) {
    console.log(action.payload)
    const error = action.payload.data.reason
      ? action.payload.data.reason
      : 'Something went wrong'
    toast.error(error)
  }

  return next(action)
}
