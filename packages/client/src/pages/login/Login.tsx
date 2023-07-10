import { Link } from 'react-router-dom'

import { Anchor, Box, Button, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'

import { FormWrapper } from '@/components'
import { useRoutes } from '@/hooks'
import { loginRule, passwordRule } from '@/shared'

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

  const { paths } = useRoutes()

  return (
    <FormWrapper formId="login">
      <Title align="center" mb={16}>
        Вход
      </Title>
      <form onSubmit={form.onSubmit(values => console.log(values))}>
        <TextInput
          withAsterisk
          label="Логин"
          placeholder="Ваш логин"
          type="text"
          mb={32}
          {...form.getInputProps('login')}
        />
        <TextInput
          withAsterisk
          label="Пароль"
          placeholder="Ваш пароль"
          type="password"
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
