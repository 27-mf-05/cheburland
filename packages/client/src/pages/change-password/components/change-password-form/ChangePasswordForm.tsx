import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Anchor, Box, Button, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { useRoutes } from '@/hooks'
import { Password, passwordRule } from '@/shared'

const initialValues = {
  oldPassword: '',
  newPassword: '',
}

type ChangePasswordFormProps = {
  handleSubmit: (values: Password) => void
}

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  handleSubmit,
}): JSX.Element => {
  const form = useForm({
    initialValues,
    validate: {
      oldPassword: value => passwordRule(value),
      newPassword: value => passwordRule(value),
    },
  })

  const { paths } = useRoutes()

  return (
    <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
      <PasswordInput
        withAsterisk
        label="Текущий пароль"
        mb={32}
        {...form.getInputProps('oldPassword')}
      />
      <PasswordInput
        withAsterisk
        label="Новый пароль"
        mb={32}
        {...form.getInputProps('newPassword')}
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
