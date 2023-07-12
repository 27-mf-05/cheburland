import { Title } from '@mantine/core'

import { FormWrapper } from '@/components'
import { RegistrationForm } from '@/pages/registration/components'

export const Registration = (): JSX.Element => {
  return (
    <FormWrapper formId="registration">
      <Title align="center" mb={16}>
        Регистрация
      </Title>
      <RegistrationForm
        handleSubmit={data => {
          console.log(data)
        }}
      />
    </FormWrapper>
  )
}
