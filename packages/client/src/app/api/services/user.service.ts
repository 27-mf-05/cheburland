import { Profile, User } from '@/shared'

import {
  USER_AVATAR_PATH,
  USER_PASSWORD_PATH,
  USER_PATH,
  USER_PROFILE_PATH,
  USER_SEARCH_PATH,
} from '../endpoints'
import request from '../request'

const UploadFileHeaders = {
  Accept: 'application/json',
}

export default class UserService {
  static get = ({ id }: { id: number }) => {
    return request<User>({
      url: `${USER_PATH}/${id}`,
      method: 'get',
    })
  }

  static profile = (data: Profile) => {
    return request<User>({
      url: USER_PROFILE_PATH,
      method: 'put',
      data,
    })
  }

  static password = (data: {
    oldPassword: 'string'
    newPassword: 'string'
  }) => {
    return request({
      url: USER_PASSWORD_PATH,
      method: 'put',
      data,
    })
  }

  static avatar = (data: FormData) => {
    return request({
      url: USER_AVATAR_PATH,
      method: 'put',
      data,
      headers: UploadFileHeaders,
    })
  }

  static search = (data: { login: 'string' }) => {
    return request<User>({
      url: USER_SEARCH_PATH,
      method: 'post',
      data,
    })
  }
}
