import { Title } from '@mantine/core'

import { FormWrapper } from '@/components'
import { useProfile } from '@/hooks'

import { ChangeProfileForm } from './components'

export const ChangeProfile = (): JSX.Element => {
  const { handleSubmitProfile } = useProfile()
  return (
    <FormWrapper formId="change-password">
      <Title align="center" mb={16}>
        Изменить данные
      </Title>
      <ChangeProfileForm handleSubmit={handleSubmitProfile} />
    </FormWrapper>
  )
}
