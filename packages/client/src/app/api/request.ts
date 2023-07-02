import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import client from './axios'

const request = async function R<T>(options: AxiosRequestConfig): Promise<T> {
  const onSuccess = function S(response: AxiosResponse) {
    const { data } = response
    return data
  }

  const onError = async (error: AxiosError) => {
    return Promise.reject(error)
  }

  return client(options).then(onSuccess).catch(onError)
}

export default request
