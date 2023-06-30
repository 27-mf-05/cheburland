import { Link } from 'react-router-dom'

import {
  BackgroundImage,
  Button,
  Flex,
  NavLink,
  Paper,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import bgImage from '@/assets/images/cheburashka_background.jpg'

export const Login = (): JSX.Element => {
  const form = useForm({
    initialValues: {
      login: '',
      password: '',
    },
    validate: {
      //здесь будут валидации
    },
  })

  return (
    <BackgroundImage src={bgImage} w="100vw" h="100vh" m="-1rem" pr="200px">
      <Flex
        id="loginPage"
        m="-1rem"
        align="center"
        justify="center"
        h="100vh"
        w="100vw">
        <Paper shadow="sm" radius="md" w="340px" h="340px" p="md">
          <Title align="center">Вход</Title>
          <form onSubmit={form.onSubmit(values => console.log(values))}>
            <TextInput
              withAsterisk
              label="Логин"
              placeholder="Ваш логин"
              type="text"
              mt="10px"
              {...form.getInputProps('login')}
            />
            <TextInput
              withAsterisk
              label="Пароль"
              placeholder="Ваш пароль"
              type="password"
              mt="10px"
              {...form.getInputProps('password')}
            />

            <Button w="100%" bg="brand.2" type="submit" mt="40px">
              Войти
            </Button>
            <NavLink
              label="Нет аккаунта?"
              component={Link}
              to="/registration"
              ta="center"
              mt="4px"
            />
          </form>
        </Paper>
      </Flex>
    </BackgroundImage>
  )
}
