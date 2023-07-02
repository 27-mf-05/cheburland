export const firstNameRule = /^([A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё-]*)$/
export const secondNameRule = /^([A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё-]*)$/
export const loginRule = /^(?!.*[-_]{2})[a-zA-Z0-9_-]{3,20}$/
export const emailRule =
  /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\\.[a-zA-Z]{2,}$/
export const passwordRule = /^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,40}$/
export const phoneRule = /^\\+?\\d{10,15}$/
