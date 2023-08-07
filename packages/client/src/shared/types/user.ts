export type User = {
  first_name: string
  second_name: string
  email: string
  phone: string
  login: string
  id: number
  display_name: string
  avatar: string
}

export type Profile = Omit<User, 'id' | 'avatar'>

export type Password = { oldPassword: string; newPassword: string }
