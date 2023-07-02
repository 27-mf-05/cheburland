import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

const { REACT_APP_API_URL } = process.env

const VERSION = 'v1'

export const client = axios.create({
  baseURL: `${REACT_APP_API_URL}/${VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  response => {
    return response
  },
  async (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export default client
