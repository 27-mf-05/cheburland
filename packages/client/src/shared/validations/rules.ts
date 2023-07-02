import {
  emailRegexp,
  firstNameRegexp,
  loginRegexp,
  passwordRegexp,
  phoneRegexp,
  secondNameRegexp,
} from '@/shared/validations/regexp'

export const firstNameRule = (value: string) => {
  return firstNameRegexp.test(value)
    ? null
    : 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов.'
}
export const secondNameRule = (value: string) => {
  return secondNameRegexp.test(value)
    ? null
    : 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов.'
}
export const loginRule = (value: string) => {
  return loginRegexp.test(value)
    ? null
    : 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без спецсимволов.'
}
export const emailRule = (value: string) => {
  return emailRegexp.test(value)
    ? null
    : 'Обязательно должна быть «собака» и точка после неё, но перед точкой обязательно должны быть буквы.'
}
export const passwordRule = (value: string) => {
  return passwordRegexp.test(value)
    ? null
    : 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.'
}
export const phoneRule = (value: string) => {
  return phoneRegexp.test(value)
    ? null
    : 'От 10 до 15 символов, состоит из цифр, может начинаться с плюса.'
}
