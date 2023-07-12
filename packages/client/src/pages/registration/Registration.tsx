import { Title } from '@mantine/core'

import { FormWrapper } from '@/components'
import { useRegistration } from '@/hooks'
import { RegistrationForm } from '@/pages/registration/components'

export const Registration = (): JSX.Element => {
  const { handleRegistration } = useRegistration()

  return (
    <FormWrapper formId="registration">
      <Title align="center" mb={16}>
        Регистрация
      </Title>
      <RegistrationForm handleSubmit={handleRegistration} />
    </FormWrapper>
  )
}
