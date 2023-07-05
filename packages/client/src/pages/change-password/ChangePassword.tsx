import { Container, Title } from '@mantine/core'

import { useProfile } from '@/hooks'

import { ChangePasswordForm } from './components'

export const ChangePassword = (): JSX.Element => {
  const { handleSubmitPassword } = useProfile({})
  return (
    <Container size="xl">
      <Title mb="xl" ta="center">
        Изменить пароль
      </Title>
      <ChangePasswordForm handleSubmit={handleSubmitPassword} />
    </Container>
  )
}
