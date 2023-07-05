import { Link } from 'react-router-dom'

import { Anchor, Container, SimpleGrid, Title } from '@mantine/core'

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
  return (
    <Container fluid px={240}>
      <Title mb="xl" ta="center">
        Профиль пользователя
      </Title>

      <ProfileHeader userName={user.first_name} avatar={user.avatar} />

      <ProfileData user={user} />

      <SimpleGrid cols={1}>
        <Anchor component={Link} to={'#'}>
          Изменить данные
        </Anchor>
        <Anchor component={Link} to={'/change-password'}>
          Изменить пароль
        </Anchor>
        <Anchor component={Link} to={'#'} color="red">
          Выйти
        </Anchor>
      </SimpleGrid>
    </Container>
  )
}
