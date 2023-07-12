import { Title } from '@mantine/core'

import { FormWrapper } from '@/components'
import { useLogin } from '@/hooks/useLogin'
import { LoginForm } from '@/pages/login/components'

export const Login = (): JSX.Element => {
  const { handleLogin } = useLogin()

  return (
    <FormWrapper formId="login">
      <Title align="center" mb={16}>
        Вход
      </Title>
      <LoginForm handleSubmit={handleLogin} />
    </FormWrapper>
  )
}
