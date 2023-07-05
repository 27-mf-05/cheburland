import { Link } from 'react-router-dom'

import { Button, Flex, NavLink, Paper, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import {
  firstNameRule,
  loginRule,
  passwordRule,
  phoneRule,
  secondNameRule,
} from '@/shared'

export const Registration = (): JSX.Element => {
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
      email: value => firstNameRule(value),
      password: value => passwordRule(value),
      phone: value => phoneRule(value),
    },
  })

  return (
    <Flex
      id="registrationPage"
      align="center"
      justify="center"
      m="-16px"
      h="100vh">
      <Paper
        w={600}
        h="auto"
        px="50px"
        py="50px"
        radius="md"
        shadow="sm"
        withBorder={true}>
        <form onSubmit={form.onSubmit(values => console.log(values))}>
          <TextInput
            mb="2rem"
            label="Имя"
            {...form.getInputProps('first_name')}
          />
          <TextInput
            mb="2rem"
            label="Фамилия"
            {...form.getInputProps('second_name')}
          />
          <TextInput mb="2rem" label="Логин" {...form.getInputProps('login')} />
          <TextInput mb="2rem" label="Почта" {...form.getInputProps('email')} />
          <TextInput
            mb="2rem"
            label="Пароль"
            {...form.getInputProps('password')}
          />
          <TextInput
            mb="2rem"
            label="Телефон"
            {...form.getInputProps('phone')}
          />
          <Button mb="2rem" fullWidth={true} type="submit">
            Зарегестрироваться
          </Button>
          <NavLink
            label="Уже зарегестрированы?"
            component={Link}
            to="/login"
            ta="center"
          />
        </form>
      </Paper>
    </Flex>
  )
}
