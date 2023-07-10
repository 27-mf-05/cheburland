import { Link } from 'react-router-dom'

import { Anchor, Flex, Paper, SimpleGrid, Title } from '@mantine/core'

import { useRoutes } from '@/hooks'
import { User } from '@/shared'

import { ProfileData, ProfileHeader } from './components'

const user: User = {
  first_name: 'John',
  second_name: 'Doe',
  email: 'pochta@yandex.ru',
  phone: '7 909 967 30 30',
  login: 'JDoe',
  id: 123,
  display_name: 'John',
  avatar: '',
}

export const Profile = (): JSX.Element => {
  const { paths } = useRoutes()

  return (
    <Flex
      id="profile"
      py={16}
      justify="center"
      align="center"
      direction="column"
      h="100vh">
      <Paper shadow="xs" py="md" w="100vh" px="xl">
        <Title mb="xl" ta="center">
          Профиль пользователя
        </Title>
        <ProfileHeader userName={user.first_name} avatar={user.avatar} />
        <ProfileData user={user} />
        <SimpleGrid cols={1}>
          <Anchor component={Link} to={'#'}>
            Изменить данные
          </Anchor>
          <Anchor component={Link} to={paths.ChangePassword}>
            Изменить пароль
          </Anchor>
          <Anchor component={Link} to={'#'} color="red">
            Выйти
          </Anchor>
        </SimpleGrid>
      </Paper>
    </Flex>
  )
}
