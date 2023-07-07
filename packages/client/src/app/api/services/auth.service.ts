import {
  AUTH_LOGOUT_PATH,
  AUTH_SIGNIN_PATH,
  AUTH_SIGNUP_PATH,
  AUTH_USER_PATH,
} from '@/app/api/endpoints'
import { SigninData, SignupData, User } from '@/shared'

import request from '../request'

export default class AuthService {
  static signin = (data: SigninData) => {
    return request({
      url: AUTH_SIGNIN_PATH,
      method: 'post',
      data,
    })
  }
  static signup = (data: SignupData) => {
    return request({
      url: AUTH_SIGNUP_PATH,
      method: 'post',
      data,
    })
  }
  static getUser = () => {
    return request<User>({
      url: AUTH_USER_PATH,
      method: 'get',
    })
  }
  static logout = () => {
    return request({
      url: AUTH_LOGOUT_PATH,
      method: 'post',
    })
  }
}
