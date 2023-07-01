import { Link } from 'react-router-dom'

import { Button, Flex, Paper, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

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
          <Button mb="2rem" fullWidth={true} variant="default" type="submit">
            Зарегестрироваться
          </Button>
          <Text
            underline={true}
            w="100%"
            display="inline-block"
            ta="center"
            component={Link}
            to="/login">
            Уже зарегестрированы?
          </Text>
        </form>
      </Paper>
    </Flex>
  )
}
