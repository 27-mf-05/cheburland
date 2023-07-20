import { toast } from 'react-toastify'

import type { Middleware } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'

export const errorToastMiddleware: Middleware = () => next => action => {
  if (
    isRejectedWithValue(action) &&
    //2 проверки из-за корявого бекенда.
    //Первая - чтобы ошибка постоянно не вылезала для неавторизованных пользоватлей.
    //Вторая - при смене пароля бекенд отдает ответ не в формате json, а строкой "ОК"
    action.payload.data.reason !== 'Cookie is not valid' &&
    action.payload.status !== 'PARSING_ERROR'
  ) {
    const error = action.payload.data.reason
      ? action.payload.data.reason
      : 'Something went wrong'
    toast.error(error)
  }

  return next(action)
}
