import { FC } from 'react'

import { Button, PasswordInput } from '@mantine/core'
import { matches, useForm } from '@mantine/form'

import { Password, passwordRegexp } from '@/shared'

const initialValues = {
  oldPassword: '',
  newPassword: '',
}

const passwordValidationMessage = 'Invalid password'

type ChangePasswordFormProps = {
  handleSubmit: (values: Password) => void
}

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  handleSubmit,
}): JSX.Element => {
  const form = useForm({
    initialValues,
    validate: {
      oldPassword: matches(passwordRegexp, passwordValidationMessage),
      newPassword: matches(passwordRegexp, passwordValidationMessage),
    },
  })

  return (
    <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
      <PasswordInput
        withAsterisk
        label="Текущий пароль"
        mb="10px"
        {...form.getInputProps('oldPassword')}
      />
      <PasswordInput
        withAsterisk
        label="Новый пароль"
        mb="10px"
        {...form.getInputProps('newPassword')}
      />
      <Button fullWidth type="submit">
        Изменить
      </Button>
    </form>
  )
}
