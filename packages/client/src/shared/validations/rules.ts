import {
  emailRule,
  firstNameRule,
  loginRule,
  passwordRule,
  phoneRule,
  secondNameRule,
} from '@/shared/validations/regexp'

export const firstNameForm = (value: string) => {
  return firstNameRule.test(value)
    ? null
    : 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов.'
}
export const secondNameForm = (value: string) => {
  return secondNameRule.test(value)
    ? null
    : 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов.'
}
export const loginForm = (value: string) => {
  return loginRule.test(value)
    ? null
    : 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без спецсимволов.'
}
export const emailForm = (value: string) => {
  return emailRule.test(value)
    ? null
    : 'Обязательно должна быть «собака» и точка после неё, но перед точкой обязательно должны быть буквы.'
}
export const passwordForm = (value: string) => {
  return passwordRule.test(value)
    ? null
    : 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.'
}
export const phoneForm = (value: string) => {
  return phoneRule.test(value)
    ? null
    : 'От 10 до 15 символов, состоит из цифр, может начинаться с плюса.'
}
