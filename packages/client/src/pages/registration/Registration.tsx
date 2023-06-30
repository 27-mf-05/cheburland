import { Link } from 'react-router-dom'

import {
  Box,
  Button,
  Container,
  createStyles,
  Flex,
  rem,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import { Validation } from '@/pages/main/constants'

const useStyles = createStyles(theme => ({
  border: {
    border: '0.3125rem solid rgba(38, 66, 18, 100)',
    borderRadius: rem(15),
  },
}))

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
      first_name: value =>
        /^([A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё-]*)$/.test(value)
          ? null
          : Validation.first_name,
      second_name: value =>
        /^([A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё-]*)$/.test(value)
          ? null
          : Validation.second_name,
      login: value =>
        /^(?!.*[-_]{2})[a-zA-Z0-9_-]{3,20}$/.test(value)
          ? null
          : Validation.login,
      email: value =>
        /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/.test(
          value
        )
          ? null
          : Validation.email,
      password: value =>
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value)
          ? null
          : Validation.password,
      phone: value => (/^\+?\d{10,15}$/.test(value) ? null : Validation.phone),
    },
  })

  const { classes } = useStyles()

  return (
    <Box id="mainPage" m="-16px">
      <Flex align="center" justify="center" h="100vh">
        <Container
          className={classes.border}
          w={600}
          h="auto"
          px="50px"
          py="50px">
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
            <TextInput
              mb="2rem"
              label="Логин"
              {...form.getInputProps('login')}
            />
            <TextInput
              mb="2rem"
              label="Почта"
              {...form.getInputProps('email')}
            />
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
        </Container>
      </Flex>
    </Box>
  )
}
