import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Anchor, Box, Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { useRoutes } from '@/hooks'
import { loginRule, passwordRule, SigninData } from '@/shared'

type LoginFormProps = {
  handleSubmit: (data: SigninData) => void
}
export const LoginForm: FC<LoginFormProps> = ({
  handleSubmit,
}): JSX.Element => {
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      login: '',
      password: '',
    },
    validate: {
      login: value => loginRule(value),
      password: value => passwordRule(value),
    },
  })

  const { paths } = useRoutes()

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="Логин"
        placeholder="Ваш логин"
        type="text"
        mb={32}
        {...form.getInputProps('login')}
      />
      <PasswordInput
        withAsterisk
        label="Пароль"
        placeholder="Ваш пароль"
        mb={32}
        {...form.getInputProps('password')}
      />
      <Button fullWidth type="submit" mb={16}>
        Войти
      </Button>
      <Box ta="center">
        <Anchor component={Link} to={paths.Registration}>
          Нет аккаунта?
        </Anchor>
      </Box>
    </form>
  )
}
