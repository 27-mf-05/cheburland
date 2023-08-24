import axios from 'axios'

import { UserRepository } from '@/app/redux/api/userService'
import { User } from '@/shared'

const REDIRECT_URI = 'http://localhost:3000'
const API_ROOT = `${REDIRECT_URI}/api/v2`

export class YandexAPIRepository implements UserRepository {
  async getCurrentUser(): Promise<User> {
    const { data } = await axios.get(`${API_ROOT}/auth/user`, {
      withCredentials: true,
    })
    return data
  }
}
