import { useContext } from 'react'
import { Link } from 'react-router-dom'

import {
  Anchor,
  Box,
  Button,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import AuthService from '@/app/api/services/auth.service'
import { AuthContext } from '@/app/context/AuthContextProvider'
import { FormWrapper } from '@/components'
import { useRoutes } from '@/hooks'
import { loginRule, passwordRule, SigninData } from '@/shared'

export const Login = (): JSX.Element => {
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

  const { fetchUser } = useContext(AuthContext)

  const submitHandler = async (data: SigninData) => {
    try {
      await AuthService.signin(data)
      await fetchUser()
    } catch (e) {
      form.setFieldError('password', 'Неверный логин или пароль')
    }
  }

  const { paths } = useRoutes()

  return (
    <FormWrapper formId="login">
      <Title align="center" mb={16}>
        Вход
      </Title>
      <form onSubmit={form.onSubmit(submitHandler)}>
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
    </FormWrapper>
  )
}
