import { Button, Title } from '@mantine/core'
import { IconLogin } from '@tabler/icons-react'

import { FormWrapper } from '@/components'
import { useLogin } from '@/hooks/useLogin'
import { useOAuth } from '@/hooks/useOAuth'
import { LoginForm } from '@/pages/login/components'

export const Login = (): JSX.Element => {
  const { handleLogin } = useLogin()
  const { handleOAuthClick } = useOAuth()

  return (
    <FormWrapper formId="login">
      <Title align="center" mb={16}>
        Вход
      </Title>
      <LoginForm handleSubmit={handleLogin} />
      <Button
        onClick={handleOAuthClick}
        fullWidth
        variant="outline"
        leftIcon={<IconLogin />}
        mt={32}>
        Войти через яндекс
      </Button>
    </FormWrapper>
  )
}
