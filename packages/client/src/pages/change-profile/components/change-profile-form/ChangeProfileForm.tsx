import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Anchor, Box, Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { useAppSelector, useRoutes } from '@/hooks'
import {
  emailRule,
  firstNameRule,
  loginRule,
  phoneRule,
  Profile,
  secondNameRule,
} from '@/shared'

type ChangeProfileFormProps = {
  handleSubmit: (values: Profile) => void
}

export const ChangeProfileForm: FC<ChangeProfileFormProps> = ({
  handleSubmit,
}): JSX.Element => {
  const { currentUser: user } = useAppSelector(state => state.user)

  const { first_name, second_name, email, phone, login, display_name } =
    user as Profile

  const initialValues = {
    first_name,
    second_name,
    email,
    phone,
    login,
    display_name: display_name || '',
  }

  const form = useForm({
    validateInputOnBlur: true,
    initialValues,
    validate: {
      first_name: value => firstNameRule(value),
      second_name: value => secondNameRule(value),
      email: value => emailRule(value),
      phone: value => phoneRule(value),
      login: value => loginRule(value),
      display_name: value => firstNameRule(value),
    },
  })

  const { paths } = useRoutes()

  return (
    <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
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
        label="Почта"
        {...form.getInputProps('email')}
      />
      <TextInput
        withAsterisk
        mb={32}
        label="Телефон"
        {...form.getInputProps('phone')}
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
        label="Ник"
        {...form.getInputProps('display_name')}
      />
      <Button mb={16} fullWidth type="submit">
        Изменить
      </Button>
      <Box ta="center">
        <Anchor component={Link} to={paths.Profile}>
          Назад
        </Anchor>
      </Box>
    </form>
  )
}
