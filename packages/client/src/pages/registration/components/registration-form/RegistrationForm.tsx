import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Anchor, Box, Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { useRoutes } from '@/hooks'
import {
  emailRule,
  firstNameRule,
  loginRule,
  passwordRule,
  phoneRule,
  secondNameRule,
  SignupData,
} from '@/shared'

type RegistrationFormProps = {
  handleSubmit: (data: SignupData) => void
}
export const RegistrationForm: FC<RegistrationFormProps> = ({
  handleSubmit,
}) => {
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: '',
    },

    validate: {
      first_name: value => firstNameRule(value),
      second_name: value => secondNameRule(value),
      login: value => loginRule(value),
      email: value => emailRule(value),
      password: value => passwordRule(value),
      phone: value => phoneRule(value),
    },
  })

  const { paths } = useRoutes()

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        mb={32}
        label="Имя"
        {...form.getInputProps('first_name')}
      />
      <TextInput
        withAsterisk
        mb={32}
        label="Фамилия"
        {...form.getInputProps('second_name')}
      />
      <TextInput
        withAsterisk
        mb={32}
        label="Логин"
        {...form.getInputProps('login')}
      />
      <TextInput
        withAsterisk
        mb={32}
        label="Почта"
        {...form.getInputProps('email')}
      />
      <PasswordInput
        withAsterisk
        mb={32}
        label="Пароль"
        {...form.getInputProps('password')}
      />
      <TextInput
        withAsterisk
        mb={32}
        label="Телефон"
        {...form.getInputProps('phone')}
      />
      <Button mb={16} fullWidth={true} type="submit">
        Зарегистрироваться
      </Button>
      <Box ta="center">
        <Anchor component={Link} to={paths.Login}>
          Уже зарегистрированы?
        </Anchor>
      </Box>
    </form>
  )
}
