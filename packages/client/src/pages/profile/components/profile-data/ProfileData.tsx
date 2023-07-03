import { Box, SimpleGrid, Text } from '@mantine/core'

import { User } from '@/shared'

type ProfileDataProps = {
  user: User
}

export const ProfileData = ({ user }: ProfileDataProps) => {
  const { first_name, second_name, email, phone, login, display_name } = user
  return (
    <SimpleGrid cols={2} verticalSpacing="xl" spacing="xl" mb="xl">
      <Box>
        <Text ta="left">Имя</Text>
      </Box>
      <Box>
        <Text ta="right">{first_name}</Text>
      </Box>

      <Box>
        <Text ta="left">Фамилия</Text>
      </Box>
      <Box>
        <Text ta="right">{second_name}</Text>
      </Box>

      <Box>
        <Text ta="left">Почта</Text>
      </Box>
      <Box>
        <Text ta="right">{email}</Text>
      </Box>

      <Box>
        <Text ta="left">Телефон</Text>
      </Box>
      <Box>
        <Text ta="right">{phone}</Text>
      </Box>

      <Box>
        <Text ta="left">Логин</Text>
      </Box>
      <Box>
        <Text ta="right">{login}</Text>
      </Box>

      <Box>
        <Text ta="left">Ник</Text>
      </Box>
      <Box>
        <Text ta="right">{display_name}</Text>
      </Box>
    </SimpleGrid>
  )
}
