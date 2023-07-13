import axios from 'axios'
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL = 'https://ya-praktikum.tech/api'
const VERSION = 'v2'

export const RESOURCES_URL = `${API_BASE_URL}/${VERSION}/resources`

const client = axios.create({
  baseURL: `${API_BASE_URL}/${VERSION}`,
  withCredentials: true,
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
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export default client
