// import { SinginResponse } from 'shared'

// import { SIGN_IN_PATH, RESET_PASSWORD_PATH } from '../endpoints'
// import request from '../request'
// export default class AuthService {
//   static signIn = ({
//     email,
//     password,
//   }: {
//     email: string
//     password: string
//   }) => {
//     return request<SinginResponse>({
//       url: SIGN_IN_PATH,
//       method: 'POST',
//       data: {
//         email,
//         password,
//       },
//     })
//   }

//   static forgotPassword = (email: string) => {
//     return request({
//       url: RESET_PASSWORD_PATH,
//       method: 'post',
//       data: {
//         email,
//       },
//     })
//   }

//   static validateToken = (token: string) => {
//     return request({
//       url: `${RESET_PASSWORD_PATH}/${token}/validate`,
//       method: 'post',
//     })
//   }

//   static resetPassword = ({
//     password,
//     token,
//   }: {
//     password: string
//     token: string
//   }) => {
//     return request({
//       url: `${RESET_PASSWORD_PATH}/${token}`,
//       method: 'post',
//       data: {
//         new_password: password,
//       },
//     })
//   }
// }
