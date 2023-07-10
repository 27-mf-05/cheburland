import { Link } from 'react-router-dom'

import { Anchor, Box, Button, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'

import { FormWrapper } from '@/components'
import { useRoutes } from '@/hooks'
import {
  firstNameRule,
  loginRule,
  passwordRule,
  phoneRule,
  secondNameRule,
} from '@/shared'

export const Registration = (): JSX.Element => {
  const { paths } = useRoutes()
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
    <FormWrapper width={480} formId="registration" height={'auto'}>
      <Title align="center" mb={16}>
        Регистрация
      </Title>
      <form onSubmit={form.onSubmit(values => console.log(values))}>
        <TextInput mb={32} label="Имя" {...form.getInputProps('first_name')} />
        <TextInput
          mb={32}
          label="Фамилия"
          {...form.getInputProps('second_name')}
        />
        <TextInput mb={32} label="Логин" {...form.getInputProps('login')} />
        <TextInput mb={32} label="Почта" {...form.getInputProps('email')} />
        <TextInput mb={32} label="Пароль" {...form.getInputProps('password')} />
        <TextInput mb={32} label="Телефон" {...form.getInputProps('phone')} />
        <Button mb={16} fullWidth={true} type="submit">
          Зарегистрироваться
        </Button>
        <Box ta="center">
          <Anchor component={Link} to={paths.Login}>
            Уже зарегестрированы?
          </Anchor>
        </Box>
      </form>
    </FormWrapper>
  )
}
