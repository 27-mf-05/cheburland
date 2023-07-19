import { Title } from '@mantine/core'

import { FormWrapper } from '@/components'
import { useProfile } from '@/hooks'

import { ChangePasswordForm } from './components'

export const ChangePassword = (): JSX.Element => {
  const { handleSubmitPassword } = useProfile()
  return (
    <FormWrapper formId="change-password">
      <Title align="center" mb={16}>
        Изменить пароль
      </Title>
      <ChangePasswordForm handleSubmit={handleSubmitPassword} />
    </FormWrapper>
  )
}
