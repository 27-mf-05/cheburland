export const firstNameRegexp = /^([A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё-]*)$/
export const secondNameRegexp = /^([A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё-]*)$/
export const loginRegexp = /^(?!.*[-_]{2})[a-zA-Z0-9_-]{3,20}$/
export const emailRegexp =
  /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\\.[a-zA-Z]{2,}$/

export const passwordRegexp = /^(?=.*[A-Z])(?=.*\d).{8,40}$/
export const phoneRegexp = /^\\+?\\d{10,15}$/
